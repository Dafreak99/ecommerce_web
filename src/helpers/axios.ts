import axios from "axios";

const Axios = axios.create({
  baseURL: "http://45.118.134.105:3000",
});

Axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default Axios;
