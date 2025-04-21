import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Client from '../Classes/Client';

// Sample data for clients
const sampleClients = [
  new Client("C001", "Alice Johnson", "123 Elm Street, Toronto", "alice@example.com"),
  new Client("C002", "Bob Smith", "456 Oak Street, Vancouver", "bob@example.com"),
  new Client("C003", "Carol White", "789 Maple Avenue, Montreal", "carol@example.com"),
  new Client("C004", "Yavid Brown", "321 Pine Road, Ottawa", "david@example.com"),
  new Client("C005", "Eve Green", "654 Spruce Lane, Calgary", "eve@example.com"),
  new Client("C006", "Zac Adams", "987 Cedar Boulevard, Halifax", "frank@example.com"),
];


const ClientsComponent = () => {
  const [filter, setFilter] = useState("All");
  const [clients, setClients] = useState([]);
  useEffect(() => {
    fetchClients();
  }, []);
  
  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/");
      const data = await response.json();
      setClients(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }


  // Filter logic
  const filteredClients = sampleClients.filter((client) => {
    if (filter === "A-M")
      return /^[A-M]/i.test(client.name); // Names starting with A-M
    if (filter === "N-Z")
      return /^[N-Z]/i.test(client.name); // Names starting with N-Z
    return true; // Default: show all clients
  });

  // Render a single client row
  const renderClientRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.address}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.phoneNumber}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Clients</Text>
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
          style={[styles.tabButton, filter === "A-M" && styles.activeTab]}
          onPress={() => setFilter("A-M")}
        >
          <Text style={styles.tabText}>A-M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === "N-Z" && styles.activeTab]}
          onPress={() => setFilter("N-Z")}
        >
          <Text style={styles.tabText}>N-Z</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Address</Text>
        <Text style={[styles.cell, styles.headerCell]}>Email</Text>
        <Text style={[styles.cell, styles.headerCell]}>Contact Info</Text>

      </View>

      {/* Table Body */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.clientID}
        renderItem={renderClientRow}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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

export default ClientsComponent;
