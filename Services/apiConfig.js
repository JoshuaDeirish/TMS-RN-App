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

export const API_BASE_URL = DEV_API_HOST || DEFAULT_HOST;

export const ACCESS_KEY = "access";
export const REFRESH_KEY = "refresh";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// A separate, interceptor-free client for refreshing. Using `api` here would
// recurse: a failing refresh would trigger the 401 handler that called it.
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// AuthContext registers a callback so a dead session can clear app state.
// Kept as a module-level hook to avoid importing React context into this file
// (which would create a circular dependency).
let onSessionExpired = null;
export const setOnSessionExpired = (fn) => {
  onSessionExpired = fn;
};

// --- Request: attach the access token ---------------------------------------
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("Token read error:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response: refresh once on 401, then retry ------------------------------
// Concurrent 401s must not each fire their own refresh, or they race and
// invalidate one another. The first one refreshes; the rest wait on it.
let refreshInFlight = null;

const normalizeError = (error) => ({
  message:
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    "Network error",
  status: error?.response?.status,
  fieldErrors: error?.response?.data,
  raw: error,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;

    const isAuthCall =
      original?.url?.includes("/auth/token/") ||
      original?.url?.includes("/auth/token/refresh/");

    // Only try to recover from a 401 once per request, and never for the
    // login/refresh calls themselves.
    if (status !== 401 || !original || original._retried || isAuthCall) {
      return Promise.reject(normalizeError(error));
    }

    original._retried = true;

    try {
      if (!refreshInFlight) {
        refreshInFlight = (async () => {
          const refresh = await AsyncStorage.getItem(REFRESH_KEY);
          if (!refresh) throw new Error("No refresh token stored");

          const res = await refreshClient.post("/auth/token/refresh/", { refresh });
          const newAccess = res.data?.access;
          if (!newAccess) throw new Error("Refresh response contained no access token");

          await AsyncStorage.setItem(ACCESS_KEY, newAccess);
          // SIMPLE_JWT may be configured to rotate refresh tokens.
          if (res.data?.refresh) {
            await AsyncStorage.setItem(REFRESH_KEY, res.data.refresh);
          }
          return newAccess;
        })();
      }

      const newAccess = await refreshInFlight;
      original.headers = { ...original.headers, Authorization: `Bearer ${newAccess}` };
      return api(original);
    } catch (refreshError) {
      // The refresh token is gone or expired: the session is genuinely over.
      await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
      if (onSessionExpired) onSessionExpired();
      return Promise.reject(normalizeError(error));
    } finally {
      refreshInFlight = null;
    }
  }
);

// Consumers import this as a default (`import api from "../Services/apiConfig"`).
// The named export above is kept so both import styles work.
export default api;
