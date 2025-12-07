import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import buttons from "../styles/buttons";

export default function ScreenHeader({ title, backText, onBack, onSave }) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome name="arrow-left" size={18} color="white" />
          <Text style={styles.backText}>{backText}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightButtons}>
        <TouchableOpacity style={buttons.secondary} onPress={onBack}>
          <Text style={buttons.secondaryText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.primary} onPress={onSave}>
          <Text style={buttons.primaryText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 30,
    backgroundColor: "#1c1c1c",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 10,
  },
});
