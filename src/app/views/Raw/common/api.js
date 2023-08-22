import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const listLotNumbers = () => {
  return instance.get(RAW_APIS.LIST.LOT_NUMBERS);
};

export const autoFillLotDetails = async (lotId) => {
  try {
    const response = await instance.get(RAW_APIS.LIST.lotDetail(lotId));
    if (response?.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};
