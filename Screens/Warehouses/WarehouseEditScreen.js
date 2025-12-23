import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import input from '../../styles/input';
import TwoColumnLayout from '../../Components/TwoColumnLayout';
import VerticalTabs from '../../Components/VerticalTabs';
import ScreenHeader from '../../Components/ScreenHeader';
import layout from '../../styles/layout';

export default function WarehouseEditScreen() {
  const route = useRoute();
    const { item } = route.params; 
    const [activeTab, setActiveTab] = useState("details");

    const [warehouseId, setWarehouseId] = useState(item.warehouseId);
    const [company, setCompany] = useState(item.company);
    const [location, setLocation] = useState(item.location);
    const [facilityType, setFacilityType] = useState(item.facility_type);
    const [shipType, setShipType] = useState(item.ship_type);
  return (
    <SafeAreaView style={layout.container}>
            <ScreenHeader
              title="Edit Warehouse"
              backText="Warehouses"
              onBack={() => navigation.navigate("WarehouseList")}
              onSave={() => console.log("Save warehouse")}
            />

      <TwoColumnLayout
      leftContent={

      <VerticalTabs
                  active={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { key: "details", label: "Details" }
                  ]}
                  />
                }
      rightContent={
        <>
          {activeTab === "details" && (
            <View>
              <TextInput style={input.input} placeholder="Company" value={company} onChangeText={setCompany} />
              <TextInput style={input.input} placeholder="Location" value={location} onChangeText={setLocation} />
              <TextInput style={input.input} placeholder="Facility Type" value={facilityType} onChangeText={setFacilityType} />
              <TextInput style={input.input} placeholder="Ship Type" value={shipType} onChangeText={setShipType} />
            </View>
          )}
        </>
      }
      />
    </SafeAreaView>
  );
}

