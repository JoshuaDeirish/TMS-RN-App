import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function VehicleEditScreen() {
  return (
    <SafeAreaViewView style={styles.container}>
      <Text style={styles.heading}>SomeScreen</Text>
    </SafeAreaViewView>
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