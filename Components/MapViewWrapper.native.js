import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { geocodeWithOpenCage } from '../Services/geocodingAPI'; // adjust path

const MapViewWrapper = ({ address }) => {
  const [markerCoords, setMarkerCoords] = useState(null);

  useEffect(() => {
    const loadCoords = async () => {
      const coords = await geocodeWithOpenCage(address);
      setMarkerCoords(coords);
    };
    loadCoords();
  }, [address]);

  if (!markerCoords) return null;

  return (
    <MapView
      style={{ height: 300, width: '100%' }}
      region={{
        ...markerCoords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={markerCoords} title="Location" />
    </MapView>
  );
};

export default MapViewWrapper;
