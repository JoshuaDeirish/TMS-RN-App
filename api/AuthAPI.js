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

/**
 * Change your own password.
 *
 * The only route by which a non-admin can do this: /auth/me/ does not expose
 * the field and /users/ is restricted to admins and HR. The current password
 * is required by the server, so a stolen token alone cannot seize an account.
 */
export const changePassword = async ({ current_password, new_password }) => {
  const response = await api.post("/auth/change-password/", {
    current_password,
    new_password,
  });
  return response.data;
};
