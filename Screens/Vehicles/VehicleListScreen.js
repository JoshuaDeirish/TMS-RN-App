import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderContainer from "../../Components/HeaderContainer";
import IconButton from "../../Components/IconButton";
import FilterButton from "../../Components/FilterButton";
import { AntDesign } from '@expo/vector-icons';
import layout from "../../styles/layout";
import SearchBar from "../../Components/SearchBar";
import BoxList from "../../Components/BoxList";
import { getVehicles } from "../../api/vehicleAPI";


export default function VehicleListScreen() {
  const [vehicles, setVehicles] = useState(); // load initial data
  const [searchQuery, setSearchQuery] = useState('');
  const allCount = 90;
  // const activeCount = vehicles.filter(v => v.maintenanceStatus === "Good").length;
  // const inactiveCount = vehicles.filter(v => v.maintenanceStatus !== "Good").length;

  const [activeFilter, setActiveFilter] = useState("All");
  const navigation = useNavigation();

  useEffect(() => {

    const load = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  },[])

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Vehicles" rightElement={<IconButton
        text="Add Vehicle"
        icon={<AntDesign name="plus" size={20} color="white" />}
        onPress={() => navigation.navigate("VehicleAdd")}
      />} />
      <View style={layout.section}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        {/* <FilterButton label="All" count={allCount} onPress={() => setActiveFilter("All")} />
        <FilterButton label="Active" count={activeCount} onPress={() => setActiveFilter("Active")} />
        <FilterButton label="Inactive" count={inactiveCount} onPress={() => setActiveFilter("Inactive")} /> */}
      </View>
      <View style={layout.subContainer}>
        {/* <BoxList
          data={vehicles}
          fields={[
            { key: "licencePlateNum", label: "Plate" },
            { key: "model", label: "Model" },
            { key: "year", label: "Year" },
            { key: "maintenanceStatus", label: "Status" }
          ]}
          image={require("../../assets/default-vehicle.jpeg")}
          onItemPress={(item) => navigation.navigate("VehicleDetail", { item })}
        /> */}
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
