import React from "react";
import { View, Image, StyleSheet } from "react-native";
import cards from "../styles/cards";

export default function Card({ variant = "base", children, image }) {
  const style = cards[variant] || cards.base;

  return (
    <View style={[style, styles.card]}>
      {/* If variant expects an image */}
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    width: "100%",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
});
