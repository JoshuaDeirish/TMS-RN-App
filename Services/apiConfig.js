import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Where the Django dev server lives, per platform.
//   - Android emulator reaches the host machine at 10.0.2.2, NOT 127.0.0.1.
//   - A physical device needs your computer's LAN IP (e.g. http://192.168.1.42:8000/api/);
//     set DEV_API_HOST below when testing on hardware.
// Note: the repo's .env file is currently unused (Expo needs extra plumbing to
// read it, and its value pointed at /tms_core/ rather than the real /api/ prefix).
const DEV_API_HOST = null; // e.g. "http://192.168.1.42:8000/api/"

const DEFAULT_HOST = Platform.select({
  android: "http://10.0.2.2:8000/api/",
  default: "http://127.0.0.1:8000/api/",
});

const API_BASE_URL = DEV_API_HOST || DEFAULT_HOST;

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

// Consumers import this as a default (`import api from "../Services/apiConfig"`).
// Without this line `api` was undefined at every call site, so every request
// threw "api.post is not a function". The named export above is kept so both
// import styles work.
export default api;