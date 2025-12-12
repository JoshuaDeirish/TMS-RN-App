import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import layout from "../../styles/layout";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import ScreenHeader from "../../Components/ScreenHeader";
import buttons from "../../styles/buttons";
import typography from "../../styles/typography";
import DetailsList from "../../Components/DetailsList";


export default function VehicleDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  return (
    <SafeAreaView style={layout.container}>
      {/* Header */}
      <ScreenHeader
        title="Vehicle Details"
        backText="Vehicles"
        onBack={() => navigation.navigate("VehicleList")}
      />

      <TwoColumnLayout
  leftContent={
    <View style={styles.leftBox}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.vehicleImage}
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={buttons.primary}
          onPress={() => navigation.navigate("VehicleEdit", { item })}
        >
          <Text style={buttons.primaryText}>Edit Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttons.secondary}
          onPress={() => navigation.goBack()}
        >
          <Text style={buttons.secondaryText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  }

  rightContent={
    <DetailsList
      data={[
        { label: "Vehicle ID", value: item.vehicleId },
        { label: "License Plate", value: item.licencePlateNum },
        { label: "Model", value: item.model },
        { label: "Year", value: item.year },
        { label: "Capacity", value: `${item.capacity} kg` },
        { label: "Maintenance Status", value: item.maintenanceStatus },
        { label: "Assigned Driver", value: item.assignedDriver || "Not Assigned" },
      ]}
    />
  }
/>

    </SafeAreaView>
  );
}

/* -----------------------------
   DETAIL ROW COMPONENT 
-------------------------------- */
const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={[typography.text.muted, styles.label]}>{label}</Text>
    <Text style={[typography.text.body, styles.value]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  /* LEFT COLUMN */
  leftBox: {
    flex: 1,
    alignItems: "center",
  },

  imageWrapper: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },

  vehicleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  buttonGroup: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },

  /* RIGHT — DETAILS */
  detailsBox: {
    width: "100%",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  label: {
    flex: 1,
  },

  value: {
    flex: 1,
    textAlign: "right",
  },
});
