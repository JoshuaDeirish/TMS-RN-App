// components/RouteMapView.native.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { geocodeWithOpenCage } from '../Services/geocodingAPI'; 

const RouteMapView = ({ origin, destination }) => {
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      const orig = await geocodeWithOpenCage(origin);
      const dest = await geocodeWithOpenCage(destination);
      setOriginCoords(orig);
      setDestinationCoords(dest);
    };
    fetchCoords();
  }, []);

  if (!originCoords || !destinationCoords) {
    return <ActivityIndicator />;
  }

  return (
    <MapView
      style={{ height: 400, width: '100%' }}
      initialRegion={{
        latitude: originCoords.latitude,
        longitude: originCoords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={originCoords} title="Origin" />
      <Marker coordinate={destinationCoords} title="Destination" />
      <Polyline
        coordinates={[originCoords, destinationCoords]}
        strokeColor="#000"
        strokeWidth={3}
      />
    </MapView>
  );
};

export default RouteMapView;
