import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const createTransactionApi = (data) => {
  return instance.post(RAW_APIS.CREATE.TRANSACTION, data);
};
