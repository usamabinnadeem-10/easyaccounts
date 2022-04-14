import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

export const deleteTransferApi = (id) => {
  let URL = getURL(TRANSACTION_URLS.DELETE_TRANSFER, 'uuid', id);
  return instance.delete(URL);
};
