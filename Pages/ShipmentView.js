import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RouteMapView from "../Components/RouteMapView";

const ShipmentViewComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { shipment } = route.params;

  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch location based on ID
  const fetchLocation = async (locationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/locations/${locationId}/`);
      const data = await response.json();
      return data.addressLine;
    } catch (error) {
      console.log("Error fetching location:", error);
      return ""; // return empty string if there's an error
    }
  };

  useEffect(() => {
    if (shipment) {
      const fetchShipmentData = async () => {
        try {
          // Fetch origin and destination locations concurrently using Promise.all
          const [origin, destination] = await Promise.all([
            fetchLocation(shipment.origin),
            fetchLocation(shipment.destination),
          ]);

          // Update state with fetched addresses
          setOriginAddress(origin);
          setDestinationAddress(destination);
          setLoading(false); // Set loading to false after both locations are fetched
        } catch (error) {
          console.log("Error fetching shipment data:", error);
          setLoading(false); // Ensure loading state is set to false even if there's an error
        }
      };

      fetchShipmentData();
    }
  }, [shipment]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Shipment Details</Text>
      </View>

      {/* Shipment Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Shipment ID:</Text>
        <Text style={styles.value}>{shipment.id}</Text>

        <Text style={styles.label}>Origin:</Text>
        <Text style={styles.value}>{originAddress}</Text>

        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>{destinationAddress}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{shipment.status}</Text>

        <Text style={styles.label}>Assigned Truck:</Text>
        <Text style={styles.value}>{shipment.assignedTruck_id || "None"}</Text>

        <Text>Location</Text>
        <RouteMapView origin={originAddress} destination={destinationAddress} />
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
