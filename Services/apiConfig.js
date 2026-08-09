import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


// 🔐 Attach token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("Token error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ❌ Response error handler (your version, slightly cleaned)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);

    return Promise.reject({
      message:
        error?.response?.data?.detail || // 🔥 important for JWT errors
        error?.response?.data?.message ||
        error?.message ||
        "Network error",
      status: error?.response?.status,
      raw: error,
    });
  }
);