import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const FuelLogViewComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fuelLog } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Fuel Log Details</Text>
      </View>

      {/* Fuel Log Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Log ID:</Text>
        <Text style={styles.value}>{fuelLog.logId}</Text>

        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{fuelLog.vehicle}</Text>

        <Text style={styles.label}>Fuel Date:</Text>
        <Text style={styles.value}>{fuelLog.fuelDate}</Text>

        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>${fuelLog.cost.toFixed(2)}</Text>

        <Text style={styles.label}>Liters:</Text>
        <Text style={styles.value}>{fuelLog.liters} L</Text>
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
  header: {
    backgroundColor: "#007bff",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#212529",
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

export default FuelLogViewComponent;
