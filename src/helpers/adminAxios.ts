import axios from "axios";

const AdAxios = axios.create({
  baseURL: "http://45.118.134.105:3000",
});

AdAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default AdAxios;
