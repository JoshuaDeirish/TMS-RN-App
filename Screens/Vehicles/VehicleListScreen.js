import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import typography from "../../styles/typography";
import HeaderContainer from "../../Components/HeaderContainer";
import IconButton from "../../Components/IconButton";
import FilterButton from "../../Components/FilterButton";
import { AntDesign } from '@expo/vector-icons';
import layout from "../../styles/layout";
import SearchBar from "../../Components/SearchBar";
import BoxList from "../../Components/BoxList";

const sampleVehicles = [
  {
    id: "1",
    vehicleId: "V001",
    licencePlateNum: "ABC-1234",
    model: "Model X",
    year: 2022,
    capacity: 5000,
    maintenanceStatus: "Good",
    assignedDriver: "John Doe"
  },
  {
    id: "2",
    vehicleId: "V002",
    licencePlateNum: "ABC-1914",
    model: "Model z",
    year: 2025,
    capacity: 50000,
    maintenanceStatus: "Needs Repair",
    assignedDriver: "John Moe"
  },
  {
    id: "3",
    vehicleId: "V012",
    licencePlateNum: "FWS-1592",
    model: "Forunner",
    year: 2020,
    capacity: 1000,
    maintenanceStatus: "Good",
    assignedDriver: "John Doe"
  }
];

export default function VehicleListScreen() {
  const [vehicles, setVehicles] = useState(sampleVehicles); // load initial data
  const [searchQuery, setSearchQuery] = useState('');
  const allCount = vehicles.length;
  const activeCount = vehicles.filter(v => v.maintenanceStatus === "Good").length;
  const inactiveCount = vehicles.filter(v => v.maintenanceStatus !== "Good").length;

  const [activeFilter, setActiveFilter] = useState("All");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Vehicles" rightElement={<IconButton
        text="Add Vehicle"
        icon={<AntDesign name="plus" size={20} color="white" />}
        onPress={() => navigation.navigate("VehicleAdd")}
      />} />
      <View style={layout.section}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterButton label="All" count={allCount} onPress={() => setActiveFilter("All")} />
        <FilterButton label="Active" count={activeCount} onPress={() => setActiveFilter("Active")} />
        <FilterButton label="Inactive" count={inactiveCount} onPress={() => setActiveFilter("Inactive")} />
      </View>
      <View style={layout.subContainer}>
        <BoxList
          data={vehicles}
          fields={[
            { key: "licencePlateNum", label: "Plate" },
            { key: "model", label: "Model" },
            { key: "year", label: "Year" },
            { key: "maintenanceStatus", label: "Status" }
          ]}
          image={require("../../assets/default-vehicle.jpeg")}
          onItemPress={(item) => navigation.navigate("VehicleDetail", { item })}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

});
