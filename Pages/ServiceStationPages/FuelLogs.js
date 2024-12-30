import React, { useState } from "react";
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

// Sample fuel logs data
const sampleFuelLogs = [
  {
    logId: "FL001",
    vehicle: "Vehicle 001",
    fuelDate: "2024-12-01",
    cost: 75.0,
    liters: 50.0,
  },
  {
    logId: "FL002",
    vehicle: "Vehicle 002",
    fuelDate: "2024-12-03",
    cost: 120.0,
    liters: 80.0,
  },
  {
    logId: "FL003",
    vehicle: "Vehicle 003",
    fuelDate: "2024-12-05",
    cost: 45.0,
    liters: 30.0,
  },
];

const FuelLogComponent = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  // Filter logs by vehicle name
  const filteredLogs = sampleFuelLogs.filter((log) =>
    log.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  // Render a single fuel log row
  const renderFuelLogRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("FuelLogViewComponent", { fuelLog: item })}
    >
      <Text style={styles.cell}>{item.logId}</Text>
      <Text style={styles.cell}>{item.vehicle}</Text>
      <Text style={styles.cell}>{item.fuelDate}</Text>
      <Text style={styles.cell}>${item.cost.toFixed(2)}</Text>
      <Text style={styles.cell}>{item.liters.toFixed(1)} L</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fuel Logs</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by vehicle..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddFuelLogComponent")}
        >
          <Text style={styles.addButtonText}>Add Log</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Log ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Vehicle</Text>
        <Text style={[styles.cell, styles.headerCell]}>Fuel Date</Text>
        <Text style={[styles.cell, styles.headerCell]}>Cost</Text>
        <Text style={[styles.cell, styles.headerCell]}>Liters</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.logId}
        renderItem={renderFuelLogRow}
      />
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

export default FuelLogComponent;
