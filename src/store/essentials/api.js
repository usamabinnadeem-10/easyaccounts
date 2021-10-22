import instance from "../../utils/axiosApi";

import { ESSENTIAL_URLS } from "../../constants/restEndPoints";

export const getAccountsApi = () => {
  return instance.get(ESSENTIAL_URLS.ACCOUNT_TYPE);
};

export const getWarehouseApi = () => {
  return instance.get(ESSENTIAL_URLS.WAREHOUSE);
};

export const getCustomersApi = () => {
  return instance.get(ESSENTIAL_URLS.CUSTOMERS);
};

export const getSuppliersApi = () => {
  return instance.get(ESSENTIAL_URLS.SUPPLIERS);
};

export const getProductHeadApi = () => {
  return instance.get(ESSENTIAL_URLS.PRODUCT_HEAD);
};

export const getProductApi = () => {
  return instance.get(ESSENTIAL_URLS.PRODUCT);
};
