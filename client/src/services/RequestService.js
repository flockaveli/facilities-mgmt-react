import http from "./http-common";
import form from "./http-formdata";

//ADMIN FUNCTIONS

const getAll = () => {
  return http.get("/requests/admin");
};
const getArchive = () => {
  return http.get("/requests/archive");
};

const getCategoryCount = () => {
  return http.get(`/requests/categories`);
};

const getDetail = _id => {
  return http.get(`/requests/detail/${_id}`);
};

const getWorkload = _id => {
  return http.get(`/requests/workerjobcount/${_id}`);
};

const assignRequest = (_id, data) => {
  return http.put(`/requests/assign/${_id}`, data);
};
const changePriority = (_id, data) => {
  return http.put(`/requests/priority/${_id}`, data);
};
const closeRequest = (_id, data) => {
  return http.put(`/requests/closerequest/${_id}`, data);
};

const adminRespond = (_id, data) => {
  return http.put(`/requests/respond/${_id}`, data);
};


// ** WORKER FUNCTIONS

const getWorkersRequests = _id => {
  return http.get(`/requests/workersrequests/${_id}`);
};

const getWorkerCategoryCount = _id => {
  return http.get(`/requests/workerscategories/${_id}`);
};

const logJob = (_id, data) => {
  return http.put(`/requests/logjob/${_id}`, data);
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
  getArchive,
  getDetail,
  adminRespond,
  assignRequest,
  getCategoryCount,
  getWorkerCategoryCount,
  getWorkload,
  changePriority,
  closeRequest,

  getWorkersRequests,
  logJob,

  createRequest,
  addMessage,
  getMyRequests



};