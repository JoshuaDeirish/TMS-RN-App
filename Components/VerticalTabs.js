import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function VerticalTabs({ active, onChange, tabs }) {
  return (
    <View>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabButton,
            active === tab.key && styles.activeTab
          ]}
          onPress={() => onChange(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              active === tab.key && styles.activeTabText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#2b2b2b",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
});
