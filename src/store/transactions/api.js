import instance from "../../utils/axiosApi";

import { TRANSACTION_URLS } from "../../constants/restEndPoints";

import { getURL } from "../../app/utilities/stringUtils";

export const getSingleTransactionApi = (transactionID) => {
  return instance.get(
    getURL(TRANSACTION_URLS.GET_TRANSACTION, "uuid", transactionID)
  );
};
