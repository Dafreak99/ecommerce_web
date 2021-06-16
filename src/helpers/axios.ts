import axios from "axios";

const Axios = axios.create({
  baseURL: "http://45.118.134.105:3000/api/v1/",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default Axios;
