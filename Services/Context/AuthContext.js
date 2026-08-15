import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authAPI from "../../api/AuthAPI";
import { setOnSessionExpired, ACCESS_KEY, REFRESH_KEY } from "../apiConfig";

export const AuthContext = createContext(null);

/** Convenience hook so screens don't each import useContext + AuthContext. */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider>");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // `loading` covers the initial "do we have a usable session?" check, so the
  // app can show a splash instead of flashing the login screen on every start.
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
  }, []);

  // Let the axios layer end the session when a refresh token finally expires.
  useEffect(() => {
    setOnSessionExpired(() => {
      setUser(null);
      setAccessToken(null);
    });
    return () => setOnSessionExpired(null);
  }, []);

  // Restore a stored session on launch. A token in storage is not proof of a
  // valid session, so we verify it against /auth/me/ before trusting it.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const access = await AsyncStorage.getItem(ACCESS_KEY);
        if (!access) return;

        const profile = await authAPI.getCurrentUser();
        if (cancelled) return;

        setAccessToken(access);
        setUser(profile);
      } catch (err) {
        // Expired or invalid; apiConfig has already cleared storage if the
        // refresh failed. Start the user at the login screen.
        if (!cancelled) await clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  const login = useCallback(async ({ email, password }) => {
    const tokens = await authAPI.login({ email, password });

    await AsyncStorage.setItem(ACCESS_KEY, tokens.access);
    await AsyncStorage.setItem(REFRESH_KEY, tokens.refresh);
    setAccessToken(tokens.access);

    // Load the profile immediately: the role drives which navigation the user
    // gets, so signing in without it would render an empty menu.
    const profile = await authAPI.getCurrentUser();
    setUser(profile);

    return profile;
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  /** Refresh the cached profile, e.g. after the user edits it. */
  const reloadUser = useCallback(async () => {
    const profile = await authAPI.getCurrentUser();
    setUser(profile);
    return profile;
  }, []);

  const value = {
    user,
    role: user?.role ?? null,
    accessToken,
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout,
    reloadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
