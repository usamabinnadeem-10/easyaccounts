import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const listLotNumbers = () => {
  return instance.get(RAW_APIS.LIST.LOT_NUMBERS);
};
