import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import buttons from '../styles/buttons';

export default function FilterButton({ label, count, onPress }) {
  return (
    <TouchableOpacity style={buttons.secondary} onPress={onPress}>
      <View style={styles.content}>
        <Text style={buttons.secondaryText}>{label}</Text>

        {typeof count === 'number' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  content: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  badge: {
    backgroundColor: "#2c2c2c",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
};
