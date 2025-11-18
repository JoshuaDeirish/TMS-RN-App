import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import typography from "../styles/typography";

export default function BoxListItem({ data, fields, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* LEFT — INFO */}
      <View style={styles.info}>
        {fields.map((field) => (
          <View key={field.key} style={{ marginBottom: 6 }}>
            <Text style={typography.detail.label}>{field.label}</Text>
            <Text style={typography.heading.h4}>{data[field.key]}</Text>
          </View>
        ))}
      </View>

      {/* RIGHT — IMAGE */}
      <View style={styles.image}>
        <Image
          source={image}
          style={styles.imageFile}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    overflow: "hidden",
    minHeight: 120,
  },
  info: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    padding: 12,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  imageFile: {
    width: 80,
    height: 80,
  },
});
