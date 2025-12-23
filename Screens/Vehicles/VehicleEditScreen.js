import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import input from '../../styles/input';
import TwoColumnLayout from '../../Components/TwoColumnLayout';
import VerticalTabs from '../../Components/VerticalTabs';
import ScreenHeader from '../../Components/ScreenHeader';
import layout from '../../styles/layout';

export default function VehicleEditScreen() {
  const route = useRoute();
  const { item } = route.params; 
  const [activeTab, setActiveTab] = useState("details");

  // Prefill form state
  const [vehicleId, setVehicleId] = useState(item.vehicleId);
  const [licencePlateNum, setLicencePlateNum] = useState(item.licencePlateNum);
  const [model, setModel] = useState(item.model);
  const [year, setYear] = useState(String(item.year));
  const [capacity, setCapacity] = useState(String(item.capacity));
  const [maintenanceStatus, setMaintenanceStatus] = useState(item.maintenanceStatus);
  const [assignedDriver, setAssignedDriver] = useState(item.assignedDriver || "");
  
  return (
    <SafeAreaView style={layout.container}>
            <ScreenHeader
              title="Edit Vehicle"
              backText="Vehicles"
              onBack={() => navigation.navigate("VehicleList")}
              onSave={() => console.log("Save vehicle")}
            />

      <TwoColumnLayout
      leftContent={

      <VerticalTabs
                  active={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { key: "details", label: "Details" },
                    { key: "specs", label: "Specifications" },
                    { key: "financial", label: "Financial Info" },
                  ]}
                />
      }

      rightContent={

          <View>
            {activeTab === "details" && (
              <View>
                <TextInput value={vehicleId} onChangeText={setVehicleId} style={input.input} placeholder="Vehicle ID" />
                <TextInput value={licencePlateNum} onChangeText={setLicencePlateNum} style={input.input} placeholder="License Plate" />
                <TextInput value={model} onChangeText={setModel} style={input.input} placeholder="Model" />
                <TextInput value={year} onChangeText={setYear} style={input.input} placeholder="Year" />
              </View>
            )}

            {activeTab === "specs" && (
              <View>
                <TextInput value={capacity} onChangeText={setCapacity} style={input.input} placeholder="Capacity KG" />
                <TextInput style={input.input} placeholder="Axles" />
              </View>
            )}

            {activeTab === "financial" && (
              <View>
                <TextInput style={input.input} placeholder="Purchase Price" />
                <TextInput style={input.input} placeholder="Monthly Cost" />
              </View>
            )}
          </View>
      }

      />
      
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
