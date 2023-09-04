import { TRANSACTION_URLS } from '../../../constants/restEndPoints';
import { getURL } from '../../utilities/stringUtils';

import instance from '../../../utils/axiosApi';

export const postTransactionApi = (data) => {
  return instance.post(TRANSACTION_URLS.CREATE_TRANSACTION, data);
};

// edit transaction with transaction id
export const editTransactionApi = (data, tId) => {
  return instance.put(
    getURL(TRANSACTION_URLS.EDIT_TRANSACTION, 'uuid', tId),
    data,
  );
};
