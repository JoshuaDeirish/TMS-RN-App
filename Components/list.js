import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import list from '../styles/list';
import input from '../styles/input';
import { Checkbox } from './Checkbox';

export default function List({ columns = [], data = [], onItemPress }) {
  const [checkedItems, setCheckedItems] = useState({});
    const allChecked = data.length > 0 && data.every((item) => checkedItems[item.id]); 

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const toggleCheckAll = () => {
  if (allChecked) {
    // Uncheck all
    const cleared = {};
    data.forEach(item => { cleared[item.id] = false });
    setCheckedItems(cleared);
  } else {
    // Check all
    const filled = {};
    data.forEach(item => { filled[item.id] = true });
    setCheckedItems(filled);
  }
};


  return (
    <View style={list.container}>

      {/* Header */}
      <View style={[list.headerRow, { flexDirection: "row", alignItems: "center" }]}>
        <Checkbox
        onChange={toggleCheckAll}
        checked={allChecked}
          />
        {columns.map((col, index) => (
          <Text key={index} style={list.headerText}>{col}</Text>
        ))}
      </View>

      {/* Rows */}
{data.length === 0 ? (
  <View style={{ padding: 20, alignItems: "center" }}>
    <Text style={{ color: "#aaa", fontSize: 16 }}>No items found.</Text>
  </View>
) : (
  data.map((item) => (
    <View
      key={item.id}
      style={[list.itemRow, { flexDirection: "row", alignItems: "center" }]}
    >
      <Checkbox
        checked={checkedItems[item.id] || false}
        onChange={() => toggleCheck(item.id)}
      />

      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={() => onItemPress && onItemPress(item)}
      >
        {columns.map((col, i) => (
          <Text key={i} style={list.itemText}>
            {item[col.toLowerCase()]}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  ))
)}
    </View>
  );
}
