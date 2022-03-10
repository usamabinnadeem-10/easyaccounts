import instance from "../../../utils/axiosApi";

import { AUTH_URLS } from "../../../constants/restEndPoints";

export const getTokenApi = (data) => {
  return instance.post(AUTH_URLS.TOKEN, data);
};
