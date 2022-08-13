import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const saleOrReturnApi = (data) => {
  return instance.post(RAW_APIS.CREATE.SALE_OR_RETURN, data);
};
