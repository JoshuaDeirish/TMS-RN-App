import React from "react";
import { FlatList } from "react-native";
import BoxListItem from "./BoxListItem";

export default function BoxList({ data, fields, image, onItemPress }) {
  return (
    <FlatList
      data={data}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(item) => item.id || item.vehicleId || item.uuid}
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
