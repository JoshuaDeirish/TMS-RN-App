import React, { useState, useMemo } from "react";
import {
  View, Text, Modal, FlatList, TextInput,
  TouchableOpacity, StyleSheet,
} from "react-native";

import colours from "../styles/colours";
import typography from "../styles/typography";
import input from "../styles/input";

/**
 * Picker for a foreign-key field.
 *
 * React Native has no cross-platform <select>, so this is a tap-to-open modal
 * list with a filter box - which also scales better than a native picker once
 * there are hundreds of locations or clients.
 *
 *   <SelectField
 *     label="Origin"
 *     value={form.origin}
 *     options={locations.map(l => ({ value: l.id, label: `${l.city}, ${l.state}` }))}
 *     onChange={(v) => update("origin", v)}
 *   />
 */
export default function SelectField({
  label,
  value,
  options = [],
  onChange,
  placeholder = "Select…",
  allowClear = true,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = options.find((o) => String(o.value) === String(value));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const choose = (val) => {
    onChange(val);
    setOpen(false);
    setQuery("");
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[typography.detail.label, styles.label]}>{label}</Text> : null}

      <TouchableOpacity
        style={[input.input, styles.control, error && styles.controlError]}
        onPress={() => setOpen(true)}
      >
        <Text style={selected ? styles.valueText : styles.placeholderText} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity style={styles.sheet} activeOpacity={1}>
            <Text style={[typography.heading.h4, styles.sheetTitle]}>{label || "Select"}</Text>

            <TextInput
              style={input.input}
              placeholder="Search…"
              placeholderTextColor={colours.textMuted}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
            />

            {allowClear ? (
              <TouchableOpacity style={styles.option} onPress={() => choose(null)}>
                <Text style={styles.clearText}>— None —</Text>
              </TouchableOpacity>
            ) : null}

            <FlatList
              data={filtered}
              keyExtractor={(item) => String(item.value)}
              style={styles.list}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={[typography.text.muted, styles.emptyText]}>No matches.</Text>
              }
              renderItem={({ item }) => {
                const isActive = String(item.value) === String(value);
                return (
                  <TouchableOpacity
                    style={[styles.option, isActive && styles.optionActive]}
                    onPress={() => choose(item.value)}
                  >
                    <Text style={isActive ? styles.optionActiveText : styles.optionText}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity style={styles.cancel} onPress={() => setOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 4 },
  label: { marginBottom: 4, marginLeft: 4 },
  control: { justifyContent: "center" },
  controlError: { borderColor: colours.danger, borderWidth: 1 },
  valueText: { color: colours.textPrimary },
  placeholderText: { color: colours.textMuted },
  errorText: { color: colours.danger, fontSize: 12, marginLeft: 4, marginBottom: 6 },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  sheet: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "80%",
    backgroundColor: colours.surface1,
    borderRadius: 14,
    padding: 20,
  },
  sheetTitle: { marginBottom: 12 },
  list: { marginTop: 8 },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  optionActive: { backgroundColor: colours.accent },
  optionText: { color: colours.textSecondary, fontSize: 15 },
  optionActiveText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  clearText: { color: colours.textMuted, fontSize: 15, fontStyle: "italic" },
  emptyText: { padding: 12, textAlign: "center" },
  cancel: { marginTop: 12, alignItems: "center", padding: 10 },
  cancelText: { color: colours.textMuted },
});
