import instance from "../../../utils/axiosApi";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

export const issueCheckApi = (data) => {
  return instance.post(CHEQUE_URLS.PERSONAL.ISSUE, data);
};
