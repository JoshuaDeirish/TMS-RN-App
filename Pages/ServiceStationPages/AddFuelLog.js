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

const AddFuelLogComponent = () => {
  const navigation = useNavigation();

  const [logId, setLogId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [fuelDate, setFuelDate] = useState("");
  const [cost, setCost] = useState("");
  const [liters, setLiters] = useState("");

  const handleAddFuelLog = () => {
    if (!logId || !vehicle || !fuelDate || !cost || !liters) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newFuelLog = {
      logId,
      vehicle,
      fuelDate,
      cost: parseFloat(cost),
      liters: parseFloat(liters),
    };

    console.log("New Fuel Log:", newFuelLog);
    Alert.alert("Success", "Fuel log added successfully!");

    // Navigate back to the FuelLog list or save the new log to your backend/storage.
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Fuel Log</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Log ID"
          value={logId}
          onChangeText={setLogId}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle"
          value={vehicle}
          onChangeText={setVehicle}
        />
        <TextInput
          style={styles.input}
          placeholder="Fuel Date (YYYY-MM-DD)"
          value={fuelDate}
          onChangeText={setFuelDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Cost"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Liters"
          value={liters}
          onChangeText={setLiters}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddFuelLog}>
          <Text style={styles.buttonText}>Save Fuel Log</Text>
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

export default AddFuelLogComponent;
