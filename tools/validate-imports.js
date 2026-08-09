#!/usr/bin/env node
/**
 * Static checks Metro will not give you until it bundles:
 *
 *   1. Syntax errors, using the project's own Babel config.
 *   2. Relative imports that do not resolve.
 *   3. Import style vs the target's actual exports - e.g.
 *      `import X from "./Y"` where Y has no default export. That yields
 *      undefined at runtime and surfaces as React error #130
 *      ("Element type is invalid"), which is painful to trace by hand.
 *
 * Usage:  node tools/validate-imports.js
 * Exits non-zero when anything is wrong, so it can gate a commit or CI step.
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const ROOT = path.resolve(__dirname, "..");
const SKIP = new Set(["node_modules", ".git", ".expo", "assets", "tools", ".bundle-check"]);
const EXTS = [".js", ".jsx", ".json"];
const PLATFORM_EXTS = [".native.js", ".web.js", ".ios.js", ".android.js"];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".js") || e.name.endsWith(".jsx")) out.push(p);
  }
  return out;
}

function resolveFile(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [
    base,
    ...PLATFORM_EXTS.map((x) => base + x),
    ...EXTS.map((x) => base + x),
    ...EXTS.map((x) => path.join(base, "index" + x)),
  ];
  for (const c of candidates) {
    try { if (fs.statSync(c).isFile()) return c; } catch { /* keep looking */ }
  }
  return null;
}

function parse(file) {
  try {
    return babel.parseSync(fs.readFileSync(file, "utf8"), {
      filename: file,
      presets: [require.resolve("babel-preset-expo")],
      babelrc: false,
      configFile: false,
    });
  } catch (err) {
    return { __error: err.message.split("\n")[0] };
  }
}

function exportsOf(ast) {
  const info = { default: false, named: new Set() };
  for (const n of ast.program.body) {
    if (n.type === "ExportDefaultDeclaration") {
      info.default = true;
    } else if (n.type === "ExportNamedDeclaration") {
      if (n.declaration) {
        const d = n.declaration;
        if (d.type === "VariableDeclaration") {
          d.declarations.forEach((v) => v.id.name && info.named.add(v.id.name));
        } else if (d.id) {
          info.named.add(d.id.name);
        }
      }
      (n.specifiers || []).forEach((s) =>
        s.exported.name === "default" ? (info.default = true) : info.named.add(s.exported.name)
      );
    } else if (n.type === "ExportAllDeclaration") {
      info.named.add("*"); // re-export: treat as unknown, stay permissive
    }
  }
  return info;
}

const files = walk(ROOT);
const asts = new Map();
const syntaxErrors = [];
const badImports = [];
const badStyle = [];

for (const f of files) {
  const ast = parse(f);
  if (ast.__error) syntaxErrors.push(`${path.relative(ROOT, f)}: ${ast.__error}`);
  else asts.set(f, ast);
}

for (const [file, ast] of asts) {
  for (const n of ast.program.body) {
    if (n.type !== "ImportDeclaration") continue;
    const spec = n.source.value;
    if (!spec.startsWith(".")) continue;

    const target = resolveFile(file, spec);
    if (!target) {
      badImports.push(`${path.relative(ROOT, file)} -> "${spec}"`);
      continue;
    }
    if (target.endsWith(".json") || !asts.has(target)) continue;

    const ex = exportsOf(asts.get(target));
    const rel = path.relative(ROOT, file);
    const relT = path.relative(ROOT, target);

    for (const s of n.specifiers) {
      if (s.type === "ImportDefaultSpecifier" && !ex.default) {
        badStyle.push(`${rel}: \`import ${s.local.name} from "${spec}"\` but ${relT} has NO default export`);
      }
      if (s.type === "ImportSpecifier" && !ex.named.has("*") && !ex.named.has(s.imported.name)) {
        badStyle.push(`${rel}: \`import { ${s.imported.name} } from "${spec}"\` but ${relT} does not export it`);
      }
    }
  }
}

const report = (title, rows) => {
  console.log(`\n${title} (${rows.length}):`);
  rows.forEach((r) => console.log("  " + r));
};

console.log(`Files parsed: ${asts.size}/${files.length}`);
report("SYNTAX ERRORS", syntaxErrors);
report("UNRESOLVED IMPORTS", badImports);
report("IMPORT/EXPORT MISMATCHES", badStyle);

const total = syntaxErrors.length + badImports.length + badStyle.length;
console.log(total === 0 ? "\nAll clear." : `\n${total} problem(s) found.`);
process.exit(total ? 1 : 0);
