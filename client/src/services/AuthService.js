import http from "./http-common";


const postLogin = loginData => {
  return http.post("/auth", loginData);
};
const registerAccount = registrationData => {
  return http.post("/users/register", registrationData);
};
const getUser = (_id) => {
  return http.get(`/users/single/${_id}`);
};
const updateUser = (_id, data) => {
  return http.put(`/users/toggle/${_id}`, data);
};
const changeUserType = (_id, data) => {
  return http.put(`/users/type/${_id}`, data);
};
const getUserList = () => {
  return http.get("/users/requesters");
};
const getWorkerList = () => {
  return http.get("/users/workers");
};

export default {
  updateUser,
  getUser,
  changeUserType,
  postLogin,
  registerAccount,
  getUserList,
  getWorkerList
}