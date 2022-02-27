import instance from "../../../utils/axiosApi";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

export const createChequeHistory = (data, isChequeEntry) => {
  if (isChequeEntry) {
    let apiData = {
      cheque_data: {
        ...data,
      },
      cheque: data.cheque,
    };
    return instance.post(
      CHEQUE_URLS.EXTERNAL.CREATE_HISTORY_WITH_CHEQUE,
      apiData
    );
  }
  return instance.post(CHEQUE_URLS.EXTERNAL.CREATE_HISTORY, data);
};
