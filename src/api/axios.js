import Axios from "axios";
import configs from "../constants/config";
import { history } from "../App";

export const logout = () => {
  history.push("/");
};

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalConfig = error.config;
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}/api/v1/auth/refresh`, {
      refreshToken,
    })
      .then((res) => {
        if ([200, 201].includes(res.status)) {
          const data = res.data?.data;

          sessionStorage.setItem("accessToken", data.accessToken);
          originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;

          return Axios(originalConfig);
        } else {
          logout();
          return Promise.reject(error);
        }
      })
      .catch(() => {
        logout();
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url, params) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url, params, queryParams) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
// export const sendPut = (url, params) =>
//   axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url, params) =>
  axiosInstance.patch(url, params).then((res) => res.data);
// export const sendDelete = (url, params) =>
//   axiosInstance.delete(url, { params }).then((res) => res.data);
