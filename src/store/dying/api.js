import instance from "../../utils/axiosApi";

import { DYING_APIS } from "../../constants/restEndPoints";

export const getAllDyingApi = () => {
  return instance.get(DYING_APIS.LIST.DYING_UNIT);
};

export const createDyingApi = (data) => {
  return instance.post(DYING_APIS.CREATE.DYING_UNIT, data);
};
