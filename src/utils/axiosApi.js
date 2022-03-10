import axios from "axios";

import { BASE } from "../constants/restEndPoints";

export const cscInstance = axios.create({
  baseURL: "https://api.countrystatecity.in/v1/",
  headers: {
    "X-CSCAPI-KEY": "a1pZdWUxNk9wbmFrcnNHWlJPYnNpanhvQVhyenN0c0NFeFZPNENxcA==",
  },
});

const instance = axios.create({
  baseURL: BASE,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("access")}`,
  // },
});

export const setHeaders = () => {
  const token = localStorage.getItem("access");
  if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    instance.defaults.headers.common["Authorization"] = null;
  }
};

(function () {
  setHeaders();
})();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh");
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      error.config &&
      !error.config.__isRetryRequest &&
      refreshToken
    ) {
      originalRequest._retry = true;

      const res = await fetch(BASE + "auth/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
      const res_1 = await res.json();
      localStorage.setItem("access", res_1.access);
      setHeaders();
      originalRequest.headers["Authorization"] = "Bearer " + res_1.access;
      return await axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
