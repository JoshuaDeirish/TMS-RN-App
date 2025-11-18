import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import layout from "../../styles/layout";
export default function VehicleDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { vehicle } = route.params;

  return (
    <SafeAreaView style={layout.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Vehicle Details</Text>
      </View>

      {/* Vehicle Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Vehicle ID:</Text>
        <Text style={styles.value}>{vehicle.vehicleId}</Text>

        <Text style={styles.label}>License Plate Number:</Text>
        <Text style={styles.value}>{vehicle.licencePlateNum}</Text>

        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{vehicle.model}</Text>

        <Text style={styles.label}>Year:</Text>
        <Text style={styles.value}>{vehicle.year}</Text>

        <Text style={styles.label}>Capacity:</Text>
        <Text style={styles.value}>{vehicle.capacity} kg</Text>

        <Text style={styles.label}>Maintenance Status:</Text>
        <Text style={styles.value}>{vehicle.maintenanceStatus}</Text>

        <Text style={styles.label}>Assigned Driver:</Text>
        <Text style={styles.value}>
          {vehicle.assignedDriver ? vehicle.assignedDriver : "Not Assigned"}
        </Text>
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


