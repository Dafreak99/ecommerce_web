import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("admin_token");

const AdAxios = axios.create({
  baseURL: "http://45.118.134.105:3000",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

export default AdAxios;
