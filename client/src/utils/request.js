import axios from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

import i18n from "src/locales/i18n";

import {
  SFACE_JWT_COOKIE,
} from "./constant";

const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROOT}/v1`,
  timeout: 20000,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

const blackList = ["login"]; // Won't add Bearer token to these routes

const onRequest = (config) => {
  if (blackList.some((item) => config.url.toLowerCase().includes(item)))
    return config;

  if (config.url.toLowerCase().includes("upload")) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }
  if (Cookies.get(SFACE_JWT_COOKIE)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get(SFACE_JWT_COOKIE)}`,
    };
  }
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  if (response.config.method === "get") return response;
  if (response.status === 200 || response.status === 201) {
    enqueueSnackbar(i18n.t('NOTI.SUCCESS'), { variant: "success" });
  }
  return response;
};

const onResponseError = (error) => {
  enqueueSnackbar(
    error?.response?.data?.error?.message || i18n.t('NOTI.FAILED'),
    {
      variant: "error",
    }
  );
  return Promise.reject(error);
};

request.interceptors.request.use(onRequest, onRequestError);
request.interceptors.response.use(onResponse, onResponseError);

export default request;
