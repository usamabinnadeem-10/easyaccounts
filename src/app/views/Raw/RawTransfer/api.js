import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const transferApi = (data) => {
  return instance.post(RAW_APIS.CREATE.TRANSFER, data);
};
