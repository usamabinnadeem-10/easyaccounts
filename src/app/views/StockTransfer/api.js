import instance from '../../../utils/axiosApi';

import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

import { getURL } from '../../utilities/stringUtils';

export const transferStockApi = (data, editId) => {
  if (editId) {
    let URL = getURL(TRANSACTION_URLS.EDIT_TRANSFER, 'uuid', editId);
    return instance.put(URL, data);
  }
  return instance.post(TRANSACTION_URLS.TRANSFER_STOCK, data);
};
