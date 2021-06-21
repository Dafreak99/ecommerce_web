import axios from "axios";

const Axios = axios.create({
  baseURL: "http://45.118.134.105:3000",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default Axios;
