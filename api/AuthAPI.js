import api from "../Services/apiConfig";


export const login = async (data) => {
  try {
    const response = await api.post("/auth/token/", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};

export const refreshToken = async (refresh) => {
  const response = await api.post("/auth/token/refresh/", {
    refresh,
  });
  return response.data;
};