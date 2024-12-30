import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const FuelStationViewComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { station } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{station.name}</Text>
      </View>

      {/* Station Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Station ID:</Text>
        <Text style={styles.value}>{station.stationID}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{station.address}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{station.phone}</Text>

        <Text style={styles.label}>Website:</Text>
        <Text style={[styles.value, styles.link]} onPress={() => navigation.navigate("WebView", { url: station.website })}>
          {station.website}
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
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
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

export default FuelStationViewComponent;
