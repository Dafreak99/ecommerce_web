import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjBiZWY0MTg0NTNmMjVjM2I0OGRjY2Y4IiwiZW1haWwiOiJhZG1pbkBhcHBjb3JlLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE2MjQwMjM1MzAsImV4cCI6MTYyNDEwOTkzMH0.240iPPWkkrSNLvl9kQC-rrsArufVBLQHbktWw29mtgs";

const Axios = axios.create({
  baseURL: "http://45.118.134.105:3000/api/v1/",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

export default Axios;
