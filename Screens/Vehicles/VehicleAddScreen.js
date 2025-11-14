import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";

export default function VehicleAddScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("VehicleList")}
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
            <Text style={styles.backButtonText}>Vehicles</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Vehicle</Text>
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={buttons.secondary}
            onPress={() => navigation.goBack()}
          >
            <Text style={buttons.secondaryText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("VehicleList")}
          >
            <Text style={styles.buttonText}>Save Vehicle</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>Vehicle Management</Text>
          </View>
          
        </View>
        <ScrollView contentContainerStyle={styles.rightContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>New Vehicle</Text>

            {/* Form Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Vehicle ID"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="License Plate Number"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Model"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Year"
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Capacity (kg)"
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Maintenance Status"
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={styles.input}
              placeholder="Assigned Driver (optional)"
              placeholderTextColor="#aaa"
            />

          </View>

          <View style={styles.bottomButtonContainer}>
            <View>

            </View>
            <View style={styles.buttonContainer}>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("VehicleList")}
              >
                <Text style={styles.buttonText}>Save Vehicle</Text>
              </TouchableOpacity>
            </View>

          </View>



        </ScrollView>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#1c1c1c",
    borderBottomWidth: 1,
    borderColor: "#7c7c7c57",

  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 30,
    columnGap: 20,
    rowGap: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  leftContainer: {
    borderRadius: 15,
    padding: 20,
    flex: 1,

  },
  rightContainer: {
    justifyContent: "flex-start",
    flex: 5,
    padding: 20,
    borderRadius: 15,
    rowGap: 20,
  },
  optionsContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#1c1c1c",
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#1c1c1c",
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#7c7c7c57",
    justifyContent: "space-between"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2C2C2C",
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "semi-bold",
  },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }

});
