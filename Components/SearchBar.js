import React from "react";
import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import searchBar from "../styles/searchBar";// we’ll create this next

export default function SearchBar({ value, onChangeText, placeholder = "Search..." }) {
  return (
    <View style={searchBar.container}>
      <AntDesign name="search1" size={18} style={searchBar.icon} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={searchBar.input}
        placeholderTextColor="#999"
      />
    </View>
  );
}
