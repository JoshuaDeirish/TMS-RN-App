import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample maintenance records data
const sampleMaintenanceRecords = [
  {
    recordId: "MR001",
    vehicle: "Vehicle 001",
    startDate: "2024-12-01",
    endDate: "2024-12-03",
    description: "Engine oil change",
    cost: 100.0,
  },
  {
    recordId: "MR002",
    vehicle: "Vehicle 002",
    startDate: "2024-12-05",
    endDate: "2024-12-06",
    description: "Tire replacement",
    cost: 200.0,
  },
  {
    recordId: "MR003",
    vehicle: "Vehicle 003",
    startDate: "2024-12-07",
    endDate: "2024-12-08",
    description: "Brake pads replacement",
    cost: 150.0,
  },
];


export default function MaintenanceRecordListScreen(){

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Maintenance Records</Text>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e9ecef",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
});


