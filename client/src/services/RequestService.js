import http from "./http-common";
import form from "./http-formdata";

//ADMIN FUNCTIONS

const getAll = () => {
  return http.get("/requests/admin");
};

const getCategoryCount = () => {
  return http.get(`/requests/categories`);
};

const getDetail = _id => {
  return http.get(`/requests/detail/${_id}`);
};

const getWorkers = () => {
  return http.get(`/user/workers`);
};

const assignRequest = (_id, data) => {
  return http.put(`/requests/assign/${_id}`, data);
};
const changePriority = (_id, data) => {
  return http.put(`/requests/priority/${_id}`, data);
};

const adminRespond = (_id, data) => {
  return http.put(`/requests/respond/${_id}`, data);
};


// ** WORKER FUNCTIONS

const getWorkersRequests = _id => {
  return http.get(`/requests/workersrequests/${_id}`);
};

const logJob = (_id, data) => {
  return http.put(`/requests/respond/${_id}`, data);
};


// ** REQUESTER FUNCTIONS

const getMyRequests = _id => {
  return http.get(`/requests/myrequests/${_id}`);
};

const createRequest = data => {
  return form.post(`/requests/createrequest`, data);
};

const addMessage = (_id, data) => {
  return form.put(`/requests/addmessage/${_id}`, data);
};


export default {
  getAll,
  getDetail,
  adminRespond,
  assignRequest,
  getCategoryCount,
  getWorkers,
  changePriority,

  getWorkersRequests,
  logJob,

  createRequest,
  addMessage,
  getMyRequests



};