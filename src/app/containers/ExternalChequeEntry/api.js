import instance from "../../../utils/axiosApi";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

export const createExternalChequeApi = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.CREATE, data);
};
