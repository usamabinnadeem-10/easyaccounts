import instance from "../../../utils/axiosApi";

import { makeQueryParamURL } from "../../utilities/stringUtils";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

export const getChequeHistoryApi = (chequeId) => {
  let URL = makeQueryParamURL(CHEQUE_URLS.EXTERNAL.HISTORY, [
    { key: "id", value: chequeId },
  ]);
  return instance.get(URL);
};
