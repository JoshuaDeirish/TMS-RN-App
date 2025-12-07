import React from "react";
import { FlatList, View, Text } from "react-native";
import BoxListItem from "./BoxListItem";

export default function BoxList({ data, fields, image, onItemPress }) {
  if (!data || data.length === 0) {
    return (
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#aaa", fontSize: 16 }}>
          No items found.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(item) => item.id || item.uuid}
      renderItem={({ item }) => (
        <BoxListItem
          data={item}
          fields={fields}
          image={image}
          onPress={() => onItemPress(item)}
        />
      )}
    />
  );
}
