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

const sampleTrailers = [
  {
    id: "1",
    trailer_number: "T012",
    type: "Big Boi",
    capacity_tons: "5000",
    status: "Good",
  },
  {
    id: "2",
    trailer_number: "T014",
    type: "Likkle Boi",
    capacity_tons: "2000",
    status: "Good",
  },
  {
    id: "3",
    trailer_number: "T212",
    type: "Chubb Boi",
    capacity_tons: "3300",
    status: "Good",
  }
];

export default function TrailerListScreen() {
    const [trailers, setTrailers] = useState(sampleTrailers); // load initial data
    const [searchQuery, setSearchQuery] = useState('');
    const allCount = trailers.length;
    const activeCount = trailers.filter(v => v.status === "Good").length;
    const inactiveCount = trailers.filter(v => v.status !== "Good").length;
  
    const [activeFilter, setActiveFilter] = useState("All");
    const navigation = useNavigation();

  return (
    <SafeAreaView style={layout.container}>
          <HeaderContainer title="Trailers" rightElement={<IconButton
            text="Add Trailer"
            icon={<AntDesign name="plus" size={20} color="white" />}
            onPress={() => navigation.navigate("TrailerAdd")}
          />} />
          <View style={layout.section}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <FilterButton label="All" count={allCount} onPress={() => setActiveFilter("All")} />
            <FilterButton label="Active" count={activeCount} onPress={() => setActiveFilter("Active")} />
            <FilterButton label="Inactive" count={inactiveCount} onPress={() => setActiveFilter("Inactive")} />
          </View>
          <View style={layout.subContainer}>
            <BoxList
              data={trailers}
              fields={[
                { key: "trailer_number", label: "Trailer Number" },
                { key: "type", label: "Type" },
                { key: "capacity_tons", label: "Capacity" },
                { key: "status", label: "Status" }
              ]}
              image={require("../../assets/default-vehicle.jpeg")}
              onItemPress={(item) => navigation.navigate("TrailerDetail", { item })}
            />
          </View>
    
        </SafeAreaView>
  );
}
