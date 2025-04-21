import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const OrdersComponent = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/");
      const data = await response.json();
      setOrder(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    if (filter === "No Shipment") return !order.shipment; // Orders with no shipment assigned
    return true; // Default: show all orders
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Render a single order row
  const renderOrderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{formatDate(item.orderDate)}</Text>
      <Text style={styles.cell}>{item.shipment}</Text>
      <Text style={styles.cell}>{item.client}</Text>
      <Text style={styles.cell}>{item.totalAmount}</Text>
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
        data={orders}
        keyExtractor={(order) => order.id}
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
