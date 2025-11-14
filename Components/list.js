import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import listStyles from '../styles/listStyles';

export default function List({ columns = [], data = [], onItemPress }) {
  return (
    <View style={listStyles.container}>
      {/* Column Headers */}
      <View style={listStyles.headerRow}>
        {columns.map((col, index) => (
          <Text key={index} style={listStyles.headerText}>{col}</Text>
        ))}
      </View>

      {/* List Items */}
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={listStyles.itemRow}
          onPress={() => onItemPress && onItemPress(item)}
        >
          {columns.map((col, i) => (
            <Text key={i} style={listStyles.itemText}>
              {item[col.toLowerCase()]} {/* Match keys with lowercased column names */}
            </Text>
          ))}
        </TouchableOpacity>
      ))}
    </View>
  );
}
