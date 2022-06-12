import axios from 'axios';

import { BASE } from '../constants/restEndPoints';

import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const cscInstance = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/',
  headers: {
    'X-CSCAPI-KEY': 'a1pZdWUxNk9wbmFrcnNHWlJPYnNpanhvQVhyenN0c0NFeFZPNENxcA==',
  },
});

const instance = axios.create({
  baseURL: BASE,
});

export const setHeaders = () => {
  const token = localStorage.getItem('access');
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    instance.defaults.headers.common['Authorization'] = null;
  }
};

(function () {
  setHeaders();
})();

const refreshAuthLogic = (failedRequest) => {
  return instance
    .post('/auth/token/refresh/', {
      refresh: localStorage.getItem('refresh'),
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem('access', tokenRefreshResponse.data.access);
      failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.access}`;
      setHeaders();
      return Promise.resolve();
    })
    .catch((error) => {
      window.location.reload();
    });
};

createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  // skipWhileRefreshing: true, commented out because deprecated, using pauseInstanceWhileRefreshing
  pauseInstanceWhileRefreshing: true,
});

export default instance;
