import instance from "../../../utils/axiosApi";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

export const createChequeHistory = (data, isChequeEntry) => {
  if (isChequeEntry) {
    return instance.post(CHEQUE_URLS.EXTERNAL.CREATE_HISTORY_WITH_CHEQUE, data);
  }
  return instance.post(CHEQUE_URLS.EXTERNAL.CREATE_HISTORY, data);
};
