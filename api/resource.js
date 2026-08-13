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
/** Pages the API will return in one request. Matches the server's cap. */
const MAX_PAGE_SIZE = 500;

/** Guard against an unbounded loop if a server ever reports `next` forever. */
const MAX_PAGES = 50;

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

    /**
     * Every record, following pagination to the end.
     *
     * The API pages all list endpoints, so `list()` returns the first page
     * only. That is what a list screen wants; it is emphatically not what a
     * foreign-key picker wants, because a truncated option list looks
     * identical to a complete one - the user simply cannot find the location
     * they need and has no way to tell why.
     *
     * Use this for reference data behind a SelectField. Use `list()` for
     * screens that show records to the user, where paging is the point.
     */
    listAll: async (params) => {
      const collected = [];
      let page = 1;

      for (let i = 0; i < MAX_PAGES; i += 1) {
        const data = (
          await api.get(base, { params: { ...params, page, page_size: MAX_PAGE_SIZE } })
        ).data;

        collected.push(...asArray(data));

        // A bare array means pagination is off: the first response was all of it.
        if (Array.isArray(data) || !data?.next) return collected;
        page += 1;
      }

      return collected;
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
