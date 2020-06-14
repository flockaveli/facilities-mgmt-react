import http from "../http-common";

const getAll = () => {
  return http.get("/requests");
};

const get = _id => {
  return http.get(`/requests/${_id}`);
};

const getCategoryCount = () => {
  return http.get(`/requests/categories`);
};

const getWorkers = () => {
  return http.get(`/user/workers`);
};

const createRequest = data => {
  return http.post("/requests", data);
};

const update = (_id, data) => {
  return http.put(`/requests/${_id}`, data);
};

const findById = _id => {
  return http.get(`/requests?_id=${_id}`);
};

export default {
  getAll,
  get,
  createRequest,
  getCategoryCount,
  update,
  findById,
  getWorkers
};