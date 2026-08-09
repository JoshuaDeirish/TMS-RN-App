import api from "../Services/apiConfig";

/**
 * Builds a standard CRUD client for a DRF endpoint.
 *
 * The API exposes ~29 endpoints that all behave identically, so writing a
 * separate file per resource would be 29 copies of the same five functions.
 *
 *   const loadAPI = createResourceApi("loads");
 *   await loadAPI.list({ search: "TMS-1042" });
 *
 * Every method returns `response.data`, not the axios response. The original
 * vehicleAPI returned the raw response, which is why VehicleListScreen ended up
 * calling setVehicles() with an axios object instead of an array.
 */
export function createResourceApi(resource) {
  const base = `/${resource}/`;

  return {
    list: async (params) => (await api.get(base, { params })).data,
    get: async (id) => (await api.get(`${base}${id}/`)).data,
    create: async (data) => (await api.post(base, data)).data,
    update: async (id, data) => (await api.put(`${base}${id}/`, data)).data,
    patch: async (id, data) => (await api.patch(`${base}${id}/`, data)).data,
    remove: async (id) => {
      await api.delete(`${base}${id}/`);
      return true;
    },
  };
}

/**
 * DRF returns either a bare array or a paginated {count, results} object
 * depending on configuration. Screens should not have to care which.
 */
export function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}
