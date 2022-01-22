import instance from "../../utils/axiosApi";

import { ESSENTIAL_URLS } from "../../constants/restEndPoints";

export const getDaybookApi = (data) => {
  let URL = `${ESSENTIAL_URLS.DAY_BOOK}${data ? `?date=${data}` : ""}`;
  return instance.get(URL);
};
