import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import buttons from "../styles/buttons";

export default function IconButton({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={buttons.primary} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", columnGap: 6 }}>
        {icon}
        <Text style={buttons.primaryText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
