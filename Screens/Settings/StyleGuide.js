import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from "react-native";

import HeaderContainer from "../../Components/HeaderContainer";
import ScreenState from "../../Components/ScreenState";
import ConfirmDialog from "../../Components/ConfirmDialog";
import SelectField from "../../Components/SelectField";
import { Checkbox } from "../../Components/Checkbox";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import input, { placeholderColour } from "../../styles/input";
import { spacing, radius, fontSize, fontWeight, elevation } from "../../styles/tokens";

/**
 * Live reference for the design system.
 *
 * Rebuilt to read from the token modules rather than restating them. The
 * previous version hardcoded pre-token values (#007bff buttons, 15px spacing),
 * so it documented a design system the app had stopped using - which is worse
 * than having no style guide, because it is confidently wrong.
 *
 * Everything below renders the real exported values. Change a token and this
 * screen changes with it; it cannot drift.
 */
export default function StyleGuide() {
  const [checked, setChecked] = useState(true);
  const [choice, setChoice] = useState(null);
  const [text, setText] = useState("");
  const [dialog, setDialog] = useState(false);

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Style Guide" />

      <ScrollView contentContainerStyle={styles.content}>
        <Note>
          Generated from styles/tokens.js, colours.js and typography.js. If a
          value here looks wrong, fix the token - not this screen.
        </Note>

        <Section title="Colour">
          <SubTitle>Surfaces</SubTitle>
          <Swatches
            items={[
              ["background", colours.background],
              ["surface1", colours.surface1],
              ["surface2", colours.surface2],
              ["surface3", colours.surface3],
              ["border", colours.border],
              ["borderStrong", colours.borderStrong],
            ]}
          />

          <SubTitle>Text</SubTitle>
          <Swatches
            items={[
              ["textPrimary", colours.textPrimary],
              ["textSecondary", colours.textSecondary],
              ["textMuted", colours.textMuted],
              ["disabledText", colours.disabledText],
            ]}
          />

          <SubTitle>Semantic</SubTitle>
          <Swatches
            items={[
              ["accent", colours.accent],
              ["success", colours.success],
              ["warning", colours.warning],
              ["danger", colours.danger],
              ["info", colours.info],
            ]}
          />
        </Section>

        <Section title="Typography">
          {[
            ["heading.h1", typography.heading.h1],
            ["heading.h2", typography.heading.h2],
            ["heading.h3", typography.heading.h3],
            ["heading.h4", typography.heading.h4],
            ["subheading.base", typography.subheading.base],
            ["text.body", typography.text.body],
            ["text.p", typography.text.p],
            ["text.small", typography.text.small],
            ["text.muted", typography.text.muted],
            ["detail.label", typography.detail.label],
            ["detail.caption", typography.detail.caption],
          ].map(([name, style]) => (
            <View key={name} style={styles.typeRow}>
              <Text style={styles.token}>{name}</Text>
              <Text style={style}>The quick brown fox</Text>
            </View>
          ))}
        </Section>

        <Section title="Spacing">
          {Object.entries(spacing).map(([name, value]) => (
            <View key={name} style={styles.scaleRow}>
              <Text style={styles.token}>{name}</Text>
              <View style={[styles.bar, { width: Math.max(value, 1) }]} />
              <Text style={typography.detail.caption}>{value}</Text>
            </View>
          ))}
        </Section>

        <Section title="Radius">
          <View style={styles.wrap}>
            {Object.entries(radius).map(([name, value]) => (
              <View key={name} style={styles.tile}>
                <View style={[styles.radiusBox, { borderRadius: value }]} />
                <Text style={typography.detail.caption}>{name} · {value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Type scale">
          <View style={styles.wrap}>
            {Object.entries(fontSize).map(([name, value]) => (
              <View key={name} style={styles.tile}>
                <Text style={{ color: colours.textPrimary, fontSize: value }}>Aa</Text>
                <Text style={typography.detail.caption}>{name} · {value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Weights">
          <View style={styles.wrap}>
            {Object.entries(fontWeight).map(([name, value]) => (
              <View key={name} style={styles.tile}>
                <Text style={{ color: colours.textPrimary, fontSize: fontSize.lg, fontWeight: value }}>
                  Aa
                </Text>
                <Text style={typography.detail.caption}>{name} · {value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Elevation">
          <View style={styles.wrap}>
            {Object.entries(elevation).map(([name, style]) => (
              <View key={name} style={[styles.elevationBox, style]}>
                <Text style={typography.detail.caption}>{name}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Buttons">
          <View style={styles.wrap}>
            {[
              ["primary", buttons.primary, buttons.primaryText],
              ["secondary", buttons.secondary, buttons.secondaryText],
              ["danger", buttons.danger, buttons.dangerText],
              ["dangerQuiet", buttons.dangerQuiet, buttons.dangerQuietText],
              ["outline", buttons.outline, buttons.outlineText],
              ["ghost", buttons.ghost, buttons.ghostText],
              ["disabled", buttons.disabled, buttons.disabledText],
            ].map(([name, box, label]) => (
              <TouchableOpacity key={name} style={box}>
                <Text style={label}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        <Section title="Inputs">
          <Text style={[typography.detail.label, styles.fieldLabel]}>Text input</Text>
          <TextInput
            style={input.input}
            value={text}
            onChangeText={setText}
            placeholder="Type something…"
            placeholderTextColor={placeholderColour}
          />

          <Text style={[typography.detail.label, styles.fieldLabel]}>Error state</Text>
          <TextInput
            style={[input.input, input.inputError]}
            value="Not a valid value"
            editable={false}
          />
          <Text style={input.errorText}>This is what a field error looks like.</Text>

          <SelectField
            label="Select field"
            value={choice}
            options={[
              { value: 1, label: "Dry Van" },
              { value: 2, label: "Reefer" },
              { value: 3, label: "Flatbed" },
            ]}
            onChange={setChoice}
          />

          <View style={styles.checkRow}>
            <Checkbox checked={checked} onChange={setChecked} />
            <Text style={typography.text.body}>Checkbox</Text>
          </View>
        </Section>

        <Section title="Status badges">
          <View style={styles.wrap}>
            {[
              ["success", colours.success],
              ["warning", colours.warning],
              ["danger", colours.danger],
              ["info", colours.info],
            ].map(([name, bg]) => (
              <View key={name} style={[styles.badge, { backgroundColor: bg }]}>
                <Text style={styles.badgeText}>{name}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Screen states">
          <Note>The shared loading / error / empty states every data screen uses.</Note>
          <View style={styles.stateBox}>
            <ScreenState loading><View /></ScreenState>
          </View>
          <View style={styles.stateBox}>
            <ScreenState error={{ message: "Could not reach the server." }} onRetry={() => {}}>
              <View />
            </ScreenState>
          </View>
          <View style={styles.stateBox}>
            <ScreenState empty emptyText="No records yet."><View /></ScreenState>
          </View>
        </Section>

        <Section title="Confirmation dialog">
          <TouchableOpacity style={buttons.secondary} onPress={() => setDialog(true)}>
            <Text style={buttons.secondaryText}>Open dialog</Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>

      <ConfirmDialog
        visible={dialog}
        title="Delete this load?"
        message="TMS-1042 will be permanently removed. This cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => setDialog(false)}
        onCancel={() => setDialog(false)}
      />
    </SafeAreaView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={typography.heading.h3}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function SubTitle({ children }) {
  return <Text style={[typography.detail.label, styles.subTitle]}>{children}</Text>;
}

function Note({ children }) {
  return <Text style={[typography.text.muted, styles.note]}>{children}</Text>;
}

function Swatches({ items }) {
  return (
    <View style={styles.wrap}>
      {items.map(([name, value]) => (
        <View key={name} style={styles.tile}>
          <View style={[styles.swatch, { backgroundColor: value }]} />
          <Text style={typography.detail.caption}>{name}</Text>
          <Text style={styles.hex}>{String(value)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xxl, rowGap: spacing.xxl },
  section: {
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.xxl,
    rowGap: spacing.lg,
  },
  sectionBody: { rowGap: spacing.md },
  subTitle: { marginTop: spacing.sm },
  note: { fontStyle: "italic" },

  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, alignItems: "flex-start" },
  tile: { alignItems: "center", rowGap: spacing.xxs, minWidth: 92 },

  swatch: {
    width: 72,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colours.borderStrong,
  },
  hex: { color: colours.textMuted, fontSize: 10 },

  typeRow: { rowGap: spacing.xxs, paddingVertical: spacing.xs },
  token: { color: colours.accent, fontSize: fontSize.xs, fontFamily: "Menlo" },

  scaleRow: { flexDirection: "row", alignItems: "center", columnGap: spacing.md },
  bar: { height: 12, backgroundColor: colours.accent, borderRadius: 2 },

  radiusBox: {
    width: 56,
    height: 56,
    backgroundColor: colours.surface3,
    borderWidth: 1,
    borderColor: colours.borderStrong,
  },
  elevationBox: {
    width: 96,
    height: 64,
    backgroundColor: colours.surface2,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  fieldLabel: { marginBottom: spacing.xs, marginLeft: spacing.xxs },
  checkRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.sm },

  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeText: { color: colours.onStatus, fontSize: 11, fontWeight: "700" },

  stateBox: {
    height: 180,
    backgroundColor: colours.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colours.border,
  },
});
