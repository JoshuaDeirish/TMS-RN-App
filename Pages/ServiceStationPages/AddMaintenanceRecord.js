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

const AddMaintenanceRecordComponent = () => {
  const navigation = useNavigation();

  const [recordId, setRecordId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const handleAddMaintenanceRecord = () => {
    if (!recordId || !vehicle || !startDate || !endDate || !description || !cost) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newMaintenanceRecord = {
      recordId,
      vehicle,
      startDate,
      endDate,
      description,
      cost: parseFloat(cost),
    };

    console.log("New Maintenance Record:", newMaintenanceRecord);

    // Navigate back to the MaintenanceRecord list or save the new record to your backend/storage.
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add Maintenance Record</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Record ID"
          value={recordId}
          onChangeText={setRecordId}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle"
          value={vehicle}
          onChangeText={setVehicle}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={endDate}
          onChangeText={setEndDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Cost"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddMaintenanceRecord}>
          <Text style={styles.buttonText}>Save Record</Text>
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

export default AddMaintenanceRecordComponent;
