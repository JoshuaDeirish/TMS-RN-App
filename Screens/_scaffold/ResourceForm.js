import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import SelectField from "../../Components/SelectField";
import ScreenState from "../../Components/ScreenState";
import { Checkbox } from "../../Components/Checkbox";
import VerticalTabs from "../../Components/VerticalTabs";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import { editableFields } from "./fields";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import input, { placeholderColour } from "../../styles/input";
import { spacing } from "../../styles/tokens";

const KEYBOARD = {
  number: "numeric",
  money: "numeric",
  email: "email-address",
  phone: "phone-pad",
};

const PLACEHOLDER = {
  date: "2026-09-01",
  datetime: "2026-09-01 08:00",
};

/**
 * One field.
 *
 * Defined at module level on purpose. LoadForm declares its equivalent inside
 * the component body, which makes React see a brand-new component type on
 * every render and remount the TextInput - so the field loses focus after each
 * keystroke. Hoisting it keeps the element type stable across renders.
 */
function FormField({ field, value, error, options, onChange }) {
  if (field.type === "boolean") {
    // Checkbox renders only the box, so the label lives here.
    return (
      <View style={styles.field}>
        <View style={styles.checkRow}>
          <Checkbox
            checked={Boolean(value)}
            onChange={(v) => onChange(field.name, v)}
          />
          <Text style={typography.text.body}>{field.label}</Text>
        </View>
        {field.help ? <Text style={input.helperText}>{field.help}</Text> : null}
        {error ? <Text style={input.errorText}>{error}</Text> : null}
      </View>
    );
  }

  if (field.type === "choice" || field.type === "fk") {
    const list = field.type === "choice" ? field.options || [] : options || [];
    return (
      <View style={styles.field}>
        <SelectField
          label={field.required ? `${field.label} *` : field.label}
          value={value}
          options={list}
          onChange={(v) => onChange(field.name, v)}
          allowClear={!field.required}
          error={error}
          placeholder={
            list.length ? "Select…" : field.emptyText || `No ${field.label.toLowerCase()} available`
          }
        />
        {field.help ? <Text style={input.helperText}>{field.help}</Text> : null}
      </View>
    );
  }

  const multiline = field.type === "textarea";

  return (
    <View style={styles.field}>
      <Text style={[typography.detail.label, styles.label]}>
        {field.required ? `${field.label} *` : field.label}
      </Text>
      <TextInput
        style={[
          input.input,
          multiline && input.multiline,
          error && input.inputError,
        ]}
        value={value === null || value === undefined ? "" : String(value)}
        onChangeText={(v) => onChange(field.name, v)}
        placeholder={field.placeholder ?? PLACEHOLDER[field.type] ?? ""}
        placeholderTextColor={placeholderColour}
        keyboardType={KEYBOARD[field.type] || "default"}
        autoCapitalize={field.type === "email" ? "none" : field.autoCapitalize || "sentences"}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
      {field.help ? <Text style={input.helperText}>{field.help}</Text> : null}
      {error ? <Text style={input.errorText}>{error}</Text> : null}
    </View>
  );
}

/**
 * The shared form body for a resource's Add and Edit screens.
 *
 * Foreign-key options are fetched once here rather than per screen, using
 * listAll() so a picker is never silently truncated to the first page.
 */
export default function ResourceForm({ config, form, setForm, fieldErrors = {} }) {
  const fields = useMemo(() => editableFields(config.fields), [config.fields]);

  const sections = useMemo(() => {
    if (config.sections?.length) {
      return config.sections.map((s) => ({
        ...s,
        resolved: s.fields
          .map((name) => fields.find((f) => f.name === name))
          .filter(Boolean),
      }));
    }
    return [{ key: "details", label: "Details", resolved: fields }];
  }, [config.sections, fields]);

  const [tab, setTab] = useState(sections[0]?.key);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const update = useCallback(
    (name, value) => setForm((prev) => ({ ...prev, [name]: value })),
    [setForm]
  );

  const fkFields = useMemo(() => fields.filter((f) => f.type === "fk" && f.optionsFrom), [fields]);

  const loadOptions = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const results = await Promise.all(
        fkFields.map(async (field) => {
          const { api, label, filter, params } = field.optionsFrom;
          // Each picker fails soft: one unreadable reference endpoint (a role
          // may legitimately lack access) must not blank the whole form.
          const rows = await api.listAll(params).catch(() => []);
          const usable = filter ? rows.filter(filter) : rows;
          return [
            field.name,
            usable.map((row) => ({ value: row.id, label: label(row) })),
          ];
        })
      );
      setOptions(Object.fromEntries(results));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fkFields]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const active = sections.find((s) => s.key === tab) || sections[0];

  const body = (
    <View>
      {active?.description ? (
        <Text style={[typography.text.muted, styles.hint]}>{active.description}</Text>
      ) : null}

      {active?.resolved.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={form[field.name]}
          error={fieldErrors[field.name]}
          options={options[field.name]}
          onChange={update}
        />
      ))}
    </View>
  );

  return (
    <ScreenState loading={loading} error={error} onRetry={loadOptions}>
      {sections.length > 1 ? (
        <TwoColumnLayout
          leftContent={
            <VerticalTabs
              active={tab}
              onChange={setTab}
              tabs={sections.map((s) => ({ key: s.key, label: s.label }))}
            />
          }
          rightContent={body}
        />
      ) : (
        <View style={styles.single}>{body}</View>
      )}
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.xs },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  label: { marginBottom: spacing.xs, marginLeft: spacing.xxs },
  hint: { marginBottom: spacing.lg },
  single: { padding: spacing.xxl },
});
