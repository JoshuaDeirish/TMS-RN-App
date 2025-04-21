import React from 'react';

const RouteMapView = ({ origin, destination }) => {
  const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyD7kCIAf-m5YDcXF50r0bHnnCKSZ6LxzC8&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;

  return (
    <iframe
      src={url}
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: 8 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default RouteMapView;
