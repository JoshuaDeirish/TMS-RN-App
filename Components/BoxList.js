import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

import BoxListItem from "./BoxListItem";
import colours from "../styles/colours";
import { spacing } from "../styles/tokens";

export default function BoxList({
  data,
  fields,
  image,
  imageKey,
  onItemPress,
  emptyText = "No items found.",
}) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      columnWrapperStyle={styles.column}
      // FlatList keys must be strings; ids come back from DRF as numbers.
      keyExtractor={(item, index) => String(item.id ?? item.uuid ?? index)}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <BoxListItem
          data={item}
          fields={fields}
          image={image}
          imageKey={imageKey}
          onPress={() => onItemPress?.(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  column: { justifyContent: "space-between" },
  content: { paddingBottom: spacing.xxl },
  empty: {
    padding: spacing.huge,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: colours.textMuted,
    fontSize: 15,
    textAlign: "center",
  },
});
