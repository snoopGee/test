import { REACT_APP_API_ENDPOINT } from "../config";

let axios = require("axios").create({
  baseURL: REACT_APP_API_ENDPOINT
});

axios.interceptors.request.use(function (config: { headers: { [x: string]: string; }; }) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default axios