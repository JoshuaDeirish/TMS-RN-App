import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/tms_core/"

export const api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
      headers: {
            "Content-Type": "application/json",
      }

      
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);

    return Promise.reject({
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Network error",
      status: error?.response?.status,
      raw: error,
    });
  }
);