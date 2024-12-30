import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample maintenance station data
const sampleStations = [
  {
    stationId: "M001",
    name: "Downtown Mechanics",
    address: "123 Main St, Toronto",
    type: "Mechanic",
    phoneNumber: "555-123-4567",
    website: "www.downtownmechanics.com",
  },
  {
    stationId: "M002",
    name: "Highway Dealership",
    address: "456 Elm St, Ottawa",
    type: "Dealership",
    phoneNumber: "555-987-6543",
    website: "www.highwaydealership.com",
  },
  {
    stationId: "M003",
    name: "AutoFix Garage",
    address: "789 Pine Ave, Montreal",
    type: "Mechanic",
    phoneNumber: "555-654-7890",
    website: "www.autofixgarage.com",
  },
];

const MaintenanceStationsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const filteredStations = sampleStations.filter((station) =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStationRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        navigation.navigate("MaintenanceStationViewComponent", { station: item })
      }
    >
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.address}</Text>
      <Text style={styles.cell}>{item.phoneNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Maintenance Stations</Text>
      </View>

      <View style={styles.searchBarContainer}>
      {/* Search Bar */}
          <TextInput
        style={styles.searchBar}
        placeholder="Search by Name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />  
      {/* Add Station Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMaintenanceStationComponent")}
      >
        <Text style={styles.addButtonText}>Add Maintenance Station</Text>
      </TouchableOpacity>
      </View>
      
      

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Address</Text>
        <Text style={[styles.cell, styles.headerCell]}>Phone</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.stationId}
        renderItem={renderStationRow}
      />

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
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
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MaintenanceStationsComponent;
