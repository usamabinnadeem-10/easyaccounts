import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { LEDGER_URLS } from '../../../constants/restEndPoints';

export const deleteLedgerApi = (data, id) => {
  return instance.delete(
    getURL(LEDGER_URLS.DELETE_LEDGER_ENTRY, 'uuid', id),
    data
  );
};

export const ledgerApi = (data, id, isEdit) => {
  if (isEdit) {
    return instance.put(
      getURL(LEDGER_URLS.UPDATE_LEDGER_ENTRY, 'uuid', id),
      data
    );
  }
  return instance.post(LEDGER_URLS.CREATE_LEDGER_ENTRY, data);
};
