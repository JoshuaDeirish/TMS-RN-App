import api from "../Services/apiConfig";

/**
 * Exchange email + password for a JWT pair.
 *
 * The response interceptor in apiConfig already normalises errors to
 * { message, status, fieldErrors }, so this must NOT read `error.response`
 * (it no longer exists by the time we get here) - doing so discarded the real
 * server message and always reported a generic "Login failed".
 */
export const login = async (credentials) => {
  const response = await api.post("/auth/token/", credentials);
  return response.data; // { access, refresh }
};

export const refreshToken = async (refresh) => {
  const response = await api.post("/auth/token/refresh/", { refresh });
  return response.data;
};

/** The signed-in user's own profile, including their role. */
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};

/** Update the fields a user is allowed to change on themselves. */
export const updateCurrentUser = async (data) => {
  const response = await api.patch("/auth/me/", data);
  return response.data;
};
