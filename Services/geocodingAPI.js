import axios from 'axios';

const geocodeWithOpenCage = async (address) => {
  const apiKey = 'a346c6e01ce24801a4f145db23998a0f';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      return {
        latitude: lat,
        longitude: lng,
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('OpenCage error:', error);
    throw error;
  }
};
export default geocodeWithOpenCage;