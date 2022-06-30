import instance from '../../../utils/axiosApi';

import { REPORTS_APIS } from '../../../constants/restEndPoints';

export const getBalanceSheetApi = () => {
  return instance.get(REPORTS_APIS.BALANCE_SHEET);
};
