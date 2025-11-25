import React from "react";
import { View, Text } from "react-native";
import typography from "../styles/typography";
import headerStyle from "../styles/headerStyle";

export default function HeaderContainer({ title, rightElement }) {
  return (
    <View style={headerStyle.main}>
      <Text style={typography.heading.h1}>{title}</Text>
      {rightElement && <View>{rightElement}</View>}
    </View>
  );
}