import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddLocationComponent = () => {
  const navigation = useNavigation();

  const [id, setId] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const addLocation = async () => {
    const locationData = {
      id,
      addressLine,
      city,
      state,
      postalCode,
      country,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/locations/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Location added successfully!");
      navigation.goBack(); // Navigate back to the locations list after adding
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "There was an error adding the location.");
    }
  };

  const handleAddLocation = () => {
    if (
      !id ||
      !addressLine ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    addLocation();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Location</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Location ID"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line"
          value={addressLine}
          onChangeText={setAddressLine}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
          <Text style={styles.buttonText}>Add Location</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 15,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
});

export default AddLocationComponent;
