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

const LocationComponent = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/locations/");
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderLocationRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.addressLine}</Text>
      <Text style={styles.cell}>{item.city}</Text>
      <Text style={styles.cell}>{item.state}</Text>
      <Text style={styles.cell}>{item.country}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Locations</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddLocationComponent")}
        >
          <Text style={styles.addButtonText}>Add Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Address</Text>
        <Text style={[styles.cell, styles.headerCell]}>City</Text>
        <Text style={[styles.cell, styles.headerCell]}>State</Text>
        <Text style={[styles.cell, styles.headerCell]}>Country</Text>
      </View>

      <FlatList
        data={locations}
        keyExtractor={(loc) => loc.id.toString()}
        renderItem={renderLocationRow}
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
          button: {
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 15,
          },
          buttonText: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          },
          addButton: {
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 5,
          },
          addButtonText: {
            color: "#fff",
            fontWeight: "bold",
          },
});

export default LocationComponent;
