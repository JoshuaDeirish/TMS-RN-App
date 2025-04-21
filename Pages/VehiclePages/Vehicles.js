import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample vehicles data
const sampleVehicles = [
  { vehicleId: "V001", licencePlateNum: "ABC-1234", model: "Model X", year: 2022, capacity: 5000, maintenanceStatus: "Good", assignedDriver: "John Doe" },
  { vehicleId: "V002", licencePlateNum: "XYZ-5678", model: "Model Y", year: 2020, capacity: 3000, maintenanceStatus: "Needs Maintenance", assignedDriver: "Jane Smith" },
  { vehicleId: "V003", licencePlateNum: "LMN-9101", model: "Model Z", year: 2021, capacity: 4000, maintenanceStatus: "Good", assignedDriver: "Alex Brown" },
  { vehicleId: "V004", licencePlateNum: "DEF-3456", model: "Model S", year: 2019, capacity: 6000, maintenanceStatus: "Needs Maintenance", assignedDriver: null },
];

const VehiclesComponent = () => {
  const [filter, setFilter] = useState("All");
  const [vehicles, setVehicle] = useState([]);
  const navigation = useNavigation();

    useEffect(() => {
      fetchVehicle();
    }, []);
  
    const fetchVehicle = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/vehicles/");
        const data = await response.json();
        setVehicle(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

  // Filter logic
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === "Good") return vehicle.maintenanceStatus === "Good";
    if (filter === "Needs Maintenance") return vehicle.maintenanceStatus === "Needs Maintenance";
    return true; // Default: show all vehicles
  });

  // Render a single vehicle row
  const renderVehicleRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("VehicleViewComponent", { vehicle: item })}
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.licensePlateNumber}</Text>
      <Text style={styles.cell}>{item.model}</Text>
      <Text style={styles.cell}>{item.maintenance}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Vehicles</Text>
      </View>
      
      {/* Filter Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, filter === "All" && styles.activeTab]}
          onPress={() => setFilter("All")}
        >
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === "Good" && styles.activeTab]}
          onPress={() => setFilter("Good")}
        >
          <Text style={styles.tabText}>Good</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === "Needs Maintenance" && styles.activeTab]}
          onPress={() => setFilter("Needs Maintenance")}
        >
          <Text style={styles.tabText}>Needs Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddVehicleComponent")}
        >
          <Text style={styles.addButtonText}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Vehicle ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>License Plate</Text>
        <Text style={[styles.cell, styles.headerCell]}>Model</Text>
        <Text style={[styles.cell, styles.headerCell]}>Status</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vehicleId}
        renderItem={renderVehicleRow}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e9ecef",
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    color: "#000",
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

export default VehiclesComponent;
