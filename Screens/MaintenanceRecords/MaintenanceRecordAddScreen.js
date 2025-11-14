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

export default function MaintenanceRecordAddScreen(){
  const navigation = useNavigation();

  const [recordId, setRecordId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const addMR = async () => {
    const mrData ={
      id: recordId,
      vehicle: vehicle,
      maintenanceDate,
      description,
      cost,
    };
    try{
      const response = await fetch("http://127.0.0.1:8000/api/maintenance-records/create/", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mrData),
      });
      const data = await response.json()
      console.log(data);

    }catch(err){
      console.log(err);
    }
  }

  const handleAddMaintenanceRecord = () => {
    if (!recordId || !vehicle || !maintenanceDate || !description || !cost) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newMaintenanceRecord = {
      recordId,
      vehicle,
      maintenanceDate,
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
          placeholder="Date (YYYY-MM-DD)"
          value={maintenanceDate}
          onChangeText={setMaintenanceDate}
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
        <TouchableOpacity style={styles.button} onPress={addMR}>
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

