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

const AddVehicleComponent = () => {
  const navigation = useNavigation();

  // State for form inputs
  const [vehicleId, setVehicleId] = useState("");
  const [licencePlateNum, setLicencePlateNum] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [capacity, setCapacity] = useState("");
  const [maintenanceStatus, setMaintenanceStatus] = useState("");
  const [assignedDriver, setAssignedDriver] = useState("");

  const addVehicle = async () => {
    const vehicleData ={
      id: vehicleId,
      licensePlateNumber: licencePlateNum,
      model,
      year,
      capacity,
      maintenance: maintenanceStatus,
      assignedOperator: assignedDriver
    };
    try{
      const response = await fetch("http://127.0.0.1:8000/api/vehicles/create/", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicleData),
      });
      const data = await response.json()
      console.log(data);

    }catch(err){
      console.log(err);
    }


    
  }

  // Function to handle form submission
  const handleAddVehicle = () => {
    if (
      !vehicleId ||
      !licencePlateNum ||
      !model ||
      !year ||
      !capacity ||
      !maintenanceStatus
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newVehicle = {
      vehicleId,
      licencePlateNum,
      model,
      year: parseInt(year, 10),
      capacity: parseFloat(capacity),
      maintenanceStatus,
      assignedDriver,
    };

    // Logic to save the new vehicle (e.g., API call or local state update)
    console.log("New Vehicle:", newVehicle);
    Alert.alert("Success", "Vehicle added successfully!");

    // Navigate back to the Vehicles list
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Vehicle</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Vehicle ID"
          value={vehicleId}
          onChangeText={setVehicleId}
        />
        <TextInput
          style={styles.input}
          placeholder="License Plate Number"
          value={licencePlateNum}
          onChangeText={setLicencePlateNum}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Capacity (kg)"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Maintenance Status"
          value={maintenanceStatus}
          onChangeText={setMaintenanceStatus}
        />
        <TextInput
          style={styles.input}
          placeholder="Assigned Driver (optional)"
          value={assignedDriver}
          onChangeText={setAssignedDriver}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={addVehicle}>
          <Text style={styles.buttonText}>Save Vehicle</Text>
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

export default AddVehicleComponent;
