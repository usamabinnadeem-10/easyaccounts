import instance from "../../utils/axiosApi";

import { ESSENTIAL_URLS } from "../../constants/restEndPoints";

// APIs to get essentials

export const getDaybookApi = () => {
  return instance.get(ESSENTIAL_URLS.DAY_BOOK);
};
