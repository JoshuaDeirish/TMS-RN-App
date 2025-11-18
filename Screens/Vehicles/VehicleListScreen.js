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

const sampleVehicles = [
  { vehicleId: "V001", licencePlateNum: "ABC-1234", model: "Model X", year: 2022, capacity: 5000, maintenanceStatus: "Good", assignedDriver: "John Doe" },
  { vehicleId: "V002", licencePlateNum: "XYZ-5678", model: "Model Y", year: 2020, capacity: 3000, maintenanceStatus: "Needs Maintenance", assignedDriver: "Jane Smith" },
  { vehicleId: "V003", licencePlateNum: "LMN-9101", model: "Model Z", year: 2021, capacity: 4000, maintenanceStatus: "Good", assignedDriver: "Alex Brown" },
  { vehicleId: "V004", licencePlateNum: "DEF-3456", model: "Model S", year: 2019, capacity: 6000, maintenanceStatus: "Needs Maintenance", assignedDriver: null },
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Vehicles</Text>
          <Text style={typography.detail.label}> Active {activeCount}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("VehicleAdd")}
        >
          <Text style={styles.addButtonText}>Add Vehicle</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "All" && styles.filterButtonActive
          ]}
          onPress={() => setActiveFilter("All")}
        >
          <View style={styles.filterButtonContainer}>
            <Text style={styles.filterText}>All</Text>
            <Text style={styles.filterText}>{allCount}</Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "Active" && styles.filterButtonActive
          ]}
          onPress={() => setActiveFilter("Active")}
        >
          <Text style={styles.filterText}>{activeCount} Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === "Inactive" && styles.filterButtonActive
          ]}
          onPress={() => setActiveFilter("Inactive")}
        >
          <Text style={styles.filterText}>{inactiveCount} Inactive</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {/* search container */}
      </View>
      <View>
        {/* list container */}
        <FlatList
          data={vehicles}
          numColumns={2} // ✅ 2 cards per row
          columnWrapperStyle={{ justifyContent: "space-between" }} // spacing between columns
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemCard}
              onPress={() => navigation.navigate("VehicleDetails", { vehicleId: item.vehicleId })}
            >
              {/* Left info section */}
              <View style={styles.infoSection}>
                <Text style={typography.detail.label}>licence Plate Number</Text>
                <Text style={typography.heading.h4}>{item.licencePlateNum}</Text>
                <Text style={typography.detail.label}>Model</Text>
                <Text style={typography.heading.h4}>{item.model}</Text>
                <Text style={typography.detail.label}>Year</Text>
                <Text style={typography.heading.h4}>{item.year}</Text>
              </View>

              {/* Right image section */}
              <View style={styles.imageSection}>
                <Image
                  source={require("../../assets/favicon.png")} // placeholder truck img
                  style={styles.vehicleImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.vehicleId}
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
  
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // pushes left & right apart
    marginBottom: 20,
    backgroundColor: "#1c1c1c",
    borderBottomWidth: 1,
    borderColor: "#7c7c7c57",
  },

  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  headerText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  itemCard: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
  },
  itemSection: {
    flex: 1,
    padding: 10,
  },
  itemCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    overflow: "hidden", // keeps rounded corners clean
    minHeight: 120,
  },

  infoSection: {
    flex: 1,
    backgroundColor: "#2C2C2C", // gray left section
    padding: 12,
    justifyContent: "center",
  },

  imageSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  vehicleImage: {
    width: 80,
    height: 80,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },

  filterButton: {
    backgroundColor: "#2C2C2C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  filterCount: {
    backgroundColor: "#3A3A3A",
    padding: 5,
    color: "#fff",
  },
  filterButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",

    columnGap: 10,
  },

  filterButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },

  filterText: {
    color: "#fff",
    fontWeight: "600",
  },

  searchInput: {
    backgroundColor: "#2C2C2C",
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
  },


});
