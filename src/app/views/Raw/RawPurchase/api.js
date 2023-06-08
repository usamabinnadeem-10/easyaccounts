import instance from '../../../../utils/axiosApi';

import { RAW_APIS } from '../../../../constants/restEndPoints';

export const createTransactionApi = (data) => {
  return instance.post(RAW_APIS.CREATE.TRANSACTION, data);
};

export const editTransactionApi = (data, uuid) => {
  return instance.put(RAW_APIS.EDIT.transaction(uuid), data);
};

export const fetchTransaction = async (uuid) => {
  try {
    const response = await instance.get(
      `${RAW_APIS.LIST.RAW_TRANSACTION}?id=${uuid}`,
    );
    if (response?.data) {
      return response.data.results[0];
    }
  } catch (error) {
    return null;
  }
};
