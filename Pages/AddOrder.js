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

const AddOrderComponent = () => {
  const navigation = useNavigation();

  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [shipmentId, setShipmentId] = useState("");

  const addOrder = async () => {
    const orderData = {
      id: orderId,
      orderDate,
      totalAmount: parseFloat(totalAmount),
      clientId,
      shipmentId,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Order added successfully!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong while adding the order.");
    }
  };

  const handleAddOrder = () => {
    if (!orderId || !orderDate || !totalAmount || !clientId || !shipmentId) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    addOrder();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add New Order</Text>

        <TextInput
          style={styles.input}
          placeholder="Order ID"
          value={orderId}
          onChangeText={setOrderId}
        />
        <TextInput
          style={styles.input}
          placeholder="Order Date (YYYY-MM-DD)"
          value={orderDate}
          onChangeText={setOrderDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Total Amount"
          value={totalAmount}
          onChangeText={setTotalAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Client ID"
          value={clientId}
          onChangeText={setClientId}
        />
        <TextInput
          style={styles.input}
          placeholder="Shipment ID"
          value={shipmentId}
          onChangeText={setShipmentId}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddOrder}>
          <Text style={styles.buttonText}>Add Order</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
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

export default AddOrderComponent;
