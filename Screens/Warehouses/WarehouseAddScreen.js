import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// components
import ScreenHeader from "../../Components/ScreenHeader";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import VerticalTabs from "../../Components/VerticalTabs";
import input from "../../styles/input";
import layout from "../../styles/layout";

export default function WarehouseAddScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("details");

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title="Add Warehouse"
        backText="Warehouses"
        onBack={() => navigation.goBack()}
        onSave={() => console.log("Save Warehouse")}
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
                <TextInput style={input.input} placeholder="Company" />
                <TextInput style={input.input} placeholder="Location" />
                <TextInput style={input.input} placeholder="Facility Type" />
                <TextInput style={input.input} placeholder="Ship Type" />
              </View>
            )}

            {activeTab === "specs" && (
              <View>
                <TextInput style={input.input} placeholder="Capacity KG" />
                <TextInput style={input.input} placeholder="Axles" />
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

