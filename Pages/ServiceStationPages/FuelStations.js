import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample fuel stations data
const sampleFuelStations = [
  { stationID: "F001", name: "QuickFuel", address: "123 Main St, Toronto", phone: "(555) 123-4567", website: "www.quickfuel.com" },
  { stationID: "F002", name: "SuperEnergy", address: "456 Elm St, Vancouver", phone: "(555) 987-6543", website: "www.superenergy.com" },
  { stationID: "F003", name: "AutoFix Garage", address: "789 Pine St, Calgary", phone: "(555) 321-0987", website: "www.autofixgarage.com" },
  { stationID: "F004", name: "FuelMaster", address: "321 Oak St, Ottawa", phone: "(555) 654-3210", website: "www.fuelmaster.com" },
];

const FuelStationsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fuelStations, setFuelStations] = useState([]);
  const navigation = useNavigation();

    useEffect(() => {
      fetchFuelStations();
    }, []);
    
    const fetchFuelStations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/fuel-stations/");
        const data = await response.json();
        setFuelStations(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

  // Filter logic
  const filteredFuelStations = fuelStations.filter((station) =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render a single fuel station row
  const renderFuelStationRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("FuelStationViewComponent", { station: item })}
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.address}</Text>
      <Text style={styles.cell}>{item.fuelPrice}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fuel Stations</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddFuelStationComponent")}
        >
          <Text style={styles.addButtonText}>Add Fuel Station</Text>
        </TouchableOpacity>
      </View>
      

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Station ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Address</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={fuelStations}
        keyExtractor={(item) => item.stationID}
        renderItem={renderFuelStationRow}
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

export default FuelStationsComponent;
