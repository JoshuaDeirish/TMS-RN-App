import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import input from '../../styles/input';

export default function VehicleEditScreen() {
  const route = useRoute();
  const { item } = route.params; // receive vehicle object

  // Prefill form state
  const [vehicleId, setVehicleId] = useState(item.vehicleId);
  const [licencePlateNum, setLicencePlateNum] = useState(item.licencePlateNum);
  const [model, setModel] = useState(item.model);
  const [year, setYear] = useState(String(item.year));
  const [capacity, setCapacity] = useState(String(item.capacity));
  const [maintenanceStatus, setMaintenanceStatus] = useState(item.maintenanceStatus);
  const [assignedDriver, setAssignedDriver] = useState(item.assignedDriver || "");
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Edit Vehicle</Text>

      <View style={{ marginTop: 20 }}>
        
        <TextInput
          style={input.input}
          placeholder="Vehicle ID"
          value={vehicleId}
          onChangeText={setVehicleId}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="License Plate Number"
          value={licencePlateNum}
          onChangeText={setLicencePlateNum}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="Capacity (kg)"
          keyboardType="numeric"
          value={capacity}
          onChangeText={setCapacity}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="Maintenance Status"
          value={maintenanceStatus}
          onChangeText={setMaintenanceStatus}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={input.input}
          placeholder="Assigned Driver (optional)"
          value={assignedDriver}
          onChangeText={setAssignedDriver}
          placeholderTextColor="#aaa"
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
