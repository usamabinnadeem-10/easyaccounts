import instance from '../../../utils/axiosApi';

import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

export const transferStockApi = (data) => {
  return instance.post(TRANSACTION_URLS.TRANSFER_STOCK, data);
};
