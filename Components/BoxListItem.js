import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import typography from "../styles/typography";

export default function BoxListItem({ data, fields, imageKey, onPress }) {
  const imageSource = data[imageKey]
    ? { uri: data[imageKey] }
    : require("../assets/default-vehicle.jpeg"); // fallback

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        {fields.map((field) => (
          <View key={field.key} style={{ marginBottom: 6 }}>
            <Text style={typography.detail.label}>{field.label}</Text>
            <Text style={typography.heading.h4}>{data[field.key]}</Text>
          </View>
        ))}
      </View>

      <View style={styles.image}>
        <Image
          source={imageSource}
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
    maxWidth: "40vw"
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
