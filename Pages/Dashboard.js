import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const API_BASE = 'http://127.0.0.1:8000/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [shipmentsByVehicle, setShipmentsByVehicle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // 1) Get operator for user ID 1
      const opRes = await fetch(`${API_BASE}/operators/?user=1`);
      const [operator] = await opRes.json();

      // 2) Get user details
      const userRes = await fetch(`${API_BASE}/users/${operator.user}/`);
      const userData = await userRes.json();
      setUser(userData);

      // 3) Get all vehicles for the operator
      const vehRes = await fetch(
        `${API_BASE}/vehicles/?assignedOperator=${operator.id}`
      );
      const vehiclesData = await vehRes.json();
      setVehicles(vehiclesData);

      // 4) Get shipments for each vehicle
      const shipmentsMap = {};
      await Promise.all(
        vehiclesData.map(async (veh) => {
          const shipRes = await fetch(
            `${API_BASE}/shipments/?assignedVehicle=${veh.id}`
          );
          const shipData = await shipRes.json();
          shipmentsMap[veh.id] = shipData;
        })
      );
      setShipmentsByVehicle(shipmentsMap);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Information Section */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>

      {/* Vehicles and Shipments Section */}
      {vehicles.map((veh) => (
        <View key={veh.id} style={styles.vehicleCard}>
          <Text style={styles.vehicleHeader}>
            {veh.licensePlateNumber} — {veh.model} ({veh.year})
          </Text>

          {shipmentsByVehicle[veh.id]?.length ? (
            shipmentsByVehicle[veh.id].map((ship) => (
              <View key={ship.id} style={styles.shipmentCard}>
                <Text>Status: {ship.status}</Text>
                <Text>
                  From: {ship.origin} → To: {ship.destination}
                </Text>
                <Text>
                  ETA: {new Date(ship.deliveryTime).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noShipments}>No shipments assigned</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  userInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#666',
  },
  vehicleCard: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  vehicleHeader: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 8 
  },
  shipmentCard: {
    marginLeft: 12,
    marginVertical: 6,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  noShipments: { 
    marginLeft: 12, 
    fontStyle: 'italic' 
  },
});

export default Dashboard;