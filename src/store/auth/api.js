import instance from "../../utils/axiosApi";

import { AUTH_URLS } from "../../constants/restEndPoints";

export const getTokenApi = (data) => {
  return instance.post(AUTH_URLS.TOKEN, data);
};

export const getBranchesApi = () => {
  return instance.get(AUTH_URLS.BRANCHES);
};

export const loginApi = (data) => {
  return instance.post(AUTH_URLS.LOGIN, data);
};

export const refreshTokenApi = (data) => {
  return instance.post(AUTH_URLS.REFRESH_TOKEN, data);
};

export const logoutApi = (data) => {
  return instance.post(AUTH_URLS.LOGOUT, {});
};
