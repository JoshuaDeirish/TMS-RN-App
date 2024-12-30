import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Order from '../Classes/Order'
// Sample data for orders
const sampleOrders = [
  new Order("O001", new Date("2024-11-01"), null, "Alice Johnson", 150.0),
  new Order("O002", new Date("2024-11-05"), { shipmentID: "S001" }, "Bob Smith", 300.0),
  new Order("O003", new Date("2024-11-10"), null, "Carol White", 200.0),
  new Order("O004", new Date("2024-11-15"), { shipmentID: "S002" }, "David Brown", 400.0),
  new Order("O005", new Date("2024-11-20"), null, "Eve Green", 100.0),
];

const OrdersComponent = () => {
  const [filter, setFilter] = useState("All");

  // Filter logic
  const filteredOrders = sampleOrders.filter((order) => {
    if (filter === "No Shipment") return !order.shipment; // Orders with no shipment assigned
    return true; // Default: show all orders
  });

  // Render a single order row
  const renderOrderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.orderID}</Text>
      <Text style={styles.cell}>{item.orderDate.toDateString()}</Text>
      <Text style={styles.cell}>{item.shipment ? item.shipment.shipmentID : "None"}</Text>
      <Text style={styles.cell}>{item.client}</Text>
      <Text style={styles.cell}>{`$${item.totalAmount.toFixed(2)}`}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Orders</Text>
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
          style={[styles.tabButton, filter === "No Shipment" && styles.activeTab]}
          onPress={() => setFilter("No Shipment")}
        >
          <Text style={styles.tabText}>No Shipment</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Order ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Order Date</Text>
        <Text style={[styles.cell, styles.headerCell]}>Shipment</Text>
        <Text style={[styles.cell, styles.headerCell]}>Client</Text>
        <Text style={[styles.cell, styles.headerCell]}>Total</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.orderID}
        renderItem={renderOrderRow}
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

export default OrdersComponent;
