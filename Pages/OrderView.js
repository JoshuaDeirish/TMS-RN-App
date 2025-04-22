import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const OrderViewComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Order Details</Text>
      </View>

      {/* Order Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{order.id}</Text>

        <Text style={styles.label}>Order Date:</Text>
        <Text style={styles.value}>{order.orderDate}</Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>${order.totalAmount.toFixed(2)}</Text>

        <Text style={styles.label}>Client ID:</Text>
        <Text style={styles.value}>{order.clientId}</Text>

        <Text style={styles.label}>Shipment ID:</Text>
        <Text style={styles.value}>{order.shipmentId}</Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
  detailContainer: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OrderViewComponent;
