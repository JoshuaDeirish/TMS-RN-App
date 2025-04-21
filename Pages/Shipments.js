import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample shipments data
const sampleShipments = [
  { shipmentID: "S001", origin: "Toronto", destination: "New York", status: "In Transit", truck: "Truck 001" },
  { shipmentID: "S002", origin: "Los Angeles", destination: "Chicago", status: "Delivered", truck: "Truck 002" },
  { shipmentID: "S003", origin: "Miami", destination: "Atlanta", status: "Not Assigned", truck: null },
  { shipmentID: "S004", origin: "San Francisco", destination: "Seattle", status: "In Transit", truck: "Truck 003" },
];

const ShipmentsComponent = () => {
  const [filter, setFilter] = useState("All");
  const [shipments, setShipments] = useState([]);
  const navigation = useNavigation();

    useEffect(() => {
      fetchShipments();
    }, []);
    
    const fetchShipments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/shipments/");
        const data = await response.json();
        setShipments(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

  // Filter logic
  const filteredShipments = shipments.filter((shipment) => {
    if (filter === "In Transit") return shipment.status === "In Transit";
    if (filter === "Not Assigned") return !shipment.truck;
    if (filter === "Delivered") return shipment.status === "Delivered";
    return true; // Default: show all shipments
  });

  // Render a single shipment row
  const renderShipmentRow = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("ShipmentViewComponent", { shipment: item })}
    >
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.origin}</Text>
      <Text style={styles.cell}>{item.destination}</Text>
      <Text style={styles.cell}>{item.deliveryTime}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Shipments</Text>
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
          style={[styles.tabButton, filter === "In Transit" && styles.activeTab]}
          onPress={() => setFilter("In Transit")}
        >
          <Text style={styles.tabText}>In Transit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === "Not Assigned" && styles.activeTab]}
          onPress={() => setFilter("Not Assigned")}
        >
          <Text style={styles.tabText}>Not Assigned</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === "Delivered" && styles.activeTab]}
          onPress={() => setFilter("Delivered")}
        >
          <Text style={styles.tabText}>Delivered</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Shipment ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Origin</Text>
        <Text style={[styles.cell, styles.headerCell]}>Destination</Text>
        <Text style={[styles.cell, styles.headerCell]}>Status</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={shipments}
        keyExtractor={(item) => item.shipmentID}
        renderItem={renderShipmentRow}
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

export default ShipmentsComponent;
