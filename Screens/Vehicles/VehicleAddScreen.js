import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createVehicle } from "../../api/vehicleAPI";

// components
import ScreenHeader from "../../Components/ScreenHeader";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import VerticalTabs from "../../Components/VerticalTabs";
import input from "../../styles/input";
import layout from "../../styles/layout";


export default function VehicleAddScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("details");
  const [form, setForm] = useState({
    licence_plate: "",
    model: "",
    make: "",
    vin: "",
    year: "",
    capacity_tons: "",
  });

  const handleCreate = async (formData) => {
    try {
      formData.capacity_tons = Number(formData.capacity_tons);
      formData.year = Number(formData.year);
      await createVehicle(formData);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title="Add Vehicle"
        backText="Vehicles"
        onBack={() => navigation.goBack()}
        onSave={() => handleCreate(form)}
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
          <>
            {activeTab === "details" && (
              <View>
                <TextInput style={input.input} placeholder="License Plate" value={form.licence_plate} onChangeText={(val) => setForm({...form, licence_plate: val})}/>
                <TextInput style={input.input} placeholder="Model" value={form.model} onChangeText={(val) => setForm({...form, model: val})}/>
                <TextInput style={input.input} placeholder="Year" value={form.year} onChangeText={(val) => setForm({...form, year: val})}/>
                <TextInput style={input.input} placeholder="Make" value={form.make} onChangeText={(val) => setForm({...form, make: val})}/>
                <TextInput style={input.input} placeholder="VIN" value={form.vin} onChangeText={(val) => setForm({...form, vin: val})}/>


              </View>
            )}

            {activeTab === "specs" && (
              <View>
                <TextInput style={input.input} placeholder="Capacity Tons" value={form.capacity_tons} onChangeText={(val) => setForm({...form, capacity_tons: val})}/>
              </View>
            )}

            {activeTab === "financial" && (
              <View>
                <TextInput style={input.input} placeholder="Purchase Price" />
                <TextInput style={input.input} placeholder="Monthly Cost" />
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}


