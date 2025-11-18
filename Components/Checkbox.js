import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import typography from "../styles/typography";
import input from "../styles/input";
import Entypo from '@expo/vector-icons/Entypo';
import colours from "../styles/colours";

export function Checkbox({ checked, onChange }) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        //margin: 8,
        marginRight: 25,
        borderColor: checked ? "#4A90E2" : colours.border,
        backgroundColor: checked ? "#4A90E2" : "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked && (
      //   <View
      //     style={{
      //       width: 12,
      //       height: 12,
      //       backgroundColor: "#999",
      //       borderRadius: 2,
      //     }}
      //   />
      <Entypo name="check" size={18} color="black" />
      )}
    </Pressable>
  );
}