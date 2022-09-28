import axios from "axios";

export const SERVER_TARGET_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_SERVER
    : process.env.DEPLOY_SERVER;

export const CLIENT_TARGET_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_HOST
    : process.env.DEPLOY_DOMAIN;

export const Api = axios.create({
  baseURL: SERVER_TARGET_URL || "",
});
Api.defaults.timeout = 2500;
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