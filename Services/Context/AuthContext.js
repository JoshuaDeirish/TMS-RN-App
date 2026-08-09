import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authAPI from "../../api/AuthAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load stored auth on app start
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const access = await AsyncStorage.getItem("access");
        const refresh = await AsyncStorage.getItem("refresh");

        if (access && refresh) {
          setAccessToken(access);
          setRefreshToken(refresh);
        }
      } catch (err) {
        console.log("Auth load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 🔐 LOGIN
  const login = async (data) => {
    const res = await authAPI.login(data);

    setAccessToken(res.access);
    setRefreshToken(res.refresh);

    await AsyncStorage.setItem("access", res.access);
    await AsyncStorage.setItem("refresh", res.refresh);

    return res;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};