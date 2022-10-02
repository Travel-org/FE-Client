import axios from "axios";

// export const SERVER_TARGET_URL = "api." + window.location.host;
export const SERVER_TARGET_URL = "http://localhost:8080";
export const Api = axios.create({
  baseURL: SERVER_TARGET_URL || "",
});
Api.defaults.timeout = 2500;  
Api.defaults.withCredentials = true;
Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
Api.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);