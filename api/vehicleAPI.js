import api from "../Services/apiConfig"

export const getVehicles = () => {
  return api.get("/vehicles/");
};

export const getVehicleById = (id) => {
  return api.get(`/vehicles/${id}/`);
};

export const createVehicle = (data) => {
  return api.post("/vehicles/", data);
};

export const updateVehicle = (id, data) => {
  return api.put(`/vehicles/${id}/`, data);
};

export const deleteVehicle = (id) => {
  return api.delete(`/vehicles/${id}/`);
};
