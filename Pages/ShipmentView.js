import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ShipmentViewComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { shipment } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Shipment Details</Text>
      </View>

      {/* Shipment Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Shipment ID:</Text>
        <Text style={styles.value}>{shipment.shipmentID}</Text>

        <Text style={styles.label}>Origin:</Text>
        <Text style={styles.value}>{shipment.origin}</Text>

        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>{shipment.destination}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{shipment.status}</Text>

        <Text style={styles.label}>Assigned Truck:</Text>
        <Text style={styles.value}>{shipment.truck ? shipment.truck : "None"}</Text>
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

export default ShipmentViewComponent;
