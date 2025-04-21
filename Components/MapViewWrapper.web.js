import React from 'react';

const MapViewWrapper = ({ address }) => {
  const query = encodeURIComponent(address);
  const url = `https://www.google.com/maps?q=${query}&output=embed`;

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

export default MapViewWrapper;
