import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddFuelStationComponent = () => {
  const navigation = useNavigation();
  const [id, setId] = useState ("");
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const addFuelStation = async () => {
    const fuelStationData ={
      id: id,
      name: stationName,
      address,
      fuelPrice,
    };
    try{
      const response = await fetch("http://127.0.0.1:8000/api/fuel-stations/create/", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fuelStationData),
      });
      const data = await response.json()
      console.log(data);

    }catch(err){
      console.log(err);
    }
  }
  const handleAddStation = () => {
    if (!stationName || !address || !phone || !website) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newStation = {
      stationName,
      address,
      phone,
      website,
    };

    // Logic to save the new station (e.g., API call or local state update)
    console.log("New Fuel Station:", newStation);
    Alert.alert("Success", "Fuel station added successfully!");

    // Navigate back to the Fuel Stations list
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add Fuel Station</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Station Name"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="Station Name"
          value={stationName}
          onChangeText={setStationName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Fuel Price"
          value={fuelPrice}
          onChangeText={setFuelPrice}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={addFuelStation}>
          <Text style={styles.buttonText}>Save Station</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 15,
    fontSize: 16,
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
  backButton: {
    backgroundColor: "#6c757d",
  },
});

export default AddFuelStationComponent;
