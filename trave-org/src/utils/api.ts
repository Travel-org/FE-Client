import axios from "axios";
export const Api = axios.create({
  baseURL: API_URL || "",
});
Api.defaults.timeout = 8000;
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