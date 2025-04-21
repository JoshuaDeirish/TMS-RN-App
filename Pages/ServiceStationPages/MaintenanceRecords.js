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


const MaintenanceRecordComponent = () => {
  const [search, setSearch] = useState("");
  const [mr, setMr] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMr();
  }, []);
  
  const fetchMr = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/maintenance-records/");
      const data = await response.json();
      setMr(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Filter records by vehicle name
  const filteredRecords = mr.filter((record) =>
    record.description.toLowerCase().includes(search.toLowerCase())
  );

  // Render a single maintenance record row
  const renderMaintenanceRecordRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("MaintenanceRecordViewComponent", { maintenanceRecord: item })}
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.vehicle}</Text>
      <Text style={styles.cell}>{item.maintenanceDate}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>${item.cost}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Maintenance Records</Text>
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
          onPress={() => navigation.navigate("AddMaintenanceRecordComponent")}
        >
          <Text style={styles.addButtonText}>Add Record</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Record ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Vehicle</Text>
        <Text style={[styles.cell, styles.headerCell]}>Start Date</Text>
        <Text style={[styles.cell, styles.headerCell]}>Description</Text>
        <Text style={[styles.cell, styles.headerCell]}>Cost</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={mr}
        keyExtractor={(item) => item.recordId}
        renderItem={renderMaintenanceRecordRow}
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

export default MaintenanceRecordComponent;
