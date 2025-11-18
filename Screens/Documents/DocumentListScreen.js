import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Card, TouchableOpacity } from 'react-native';


export default function DocumentListScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>SomeScreen</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });