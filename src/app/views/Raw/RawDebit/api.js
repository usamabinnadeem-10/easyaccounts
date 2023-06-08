import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const fetchTransaction = async (uuid) => {
  try {
    const response = await instance.get(
      `${RAW_APIS.LIST.RAW_DEBIT_TRANSACTION}?id=${uuid}`,
    );
    if (response?.data) {
      return response.data.results[0];
    }
  } catch (error) {
    return null;
  }
};
