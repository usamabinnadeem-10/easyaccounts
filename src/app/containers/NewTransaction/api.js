import {
  TRANSACTION_URLS,
  LEDGER_URLS,
} from '../../../constants/restEndPoints';
import { getURL, makeQueryParamURL } from '../../utilities/stringUtils';

import instance from '../../../utils/axiosApi';

export const getPersonBalance = (person) => {
  let URL = makeQueryParamURL(LEDGER_URLS.ALL_BALANCES, [
    { key: 'person_id', value: person },
  ]);
  return instance.get(URL);
};
