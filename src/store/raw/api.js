import instance from "../../utils/axiosApi";

import { RAW_APIS } from "../../constants/restEndPoints";

export const createFormulaApi = (data) => {
  return instance.post(RAW_APIS.CREATE.FORMULA, data);
};

export const listFormulaApi = () => {
  return instance.get(RAW_APIS.LIST.FORMULA);
};

export const createRawProduct = (data) => {
  return instance.post(RAW_APIS.CREATE.PRODUCT, data);
};

export const listRawProductApi = () => {
  return instance.get(RAW_APIS.LIST.PRODUCT);
};
