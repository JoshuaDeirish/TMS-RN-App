import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MapViewWrapper from "../../Components/MapViewWrapper";

const FuelStationViewComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { station } = route.params;
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{station.name}</Text>
      </View>

      {/* Station Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Station ID:</Text>
        <Text style={styles.value}>{station.id}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{station.address}</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{station.name}</Text>
        <Text style={styles.label}>Fuel Price:</Text>
        <Text style={styles.value}>${station.fuelPrice}/L</Text>
      </View>
      <MapViewWrapper address={station.address} />
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
  headerContainer: {
    backgroundColor: "#007bff",
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailContainer: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FuelStationViewComponent;
