import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationViewComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Location Details</Text>
      </View>

      {/* Location Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Location ID:</Text>
        <Text style={styles.value}>{location.id}</Text>

        <Text style={styles.label}>Address Line:</Text>
        <Text style={styles.value}>{location.addressLine}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{location.city}</Text>

        <Text style={styles.label}>State:</Text>
        <Text style={styles.value}>{location.state}</Text>

        <Text style={styles.label}>Postal Code:</Text>
        <Text style={styles.value}>{location.postalCode}</Text>

        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{location.country}</Text>
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

export default LocationViewComponent;
