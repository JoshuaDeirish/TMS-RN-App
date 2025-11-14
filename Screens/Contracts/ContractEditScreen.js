import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContractEditScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});