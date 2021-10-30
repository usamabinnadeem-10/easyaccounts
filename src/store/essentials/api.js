import instance from "../../utils/axiosApi";

import { ESSENTIAL_URLS, EXPENSE_URLS } from "../../constants/restEndPoints";

// APIs to get essentials

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

export const getExpenseAccountsApi = () => {
  return instance.get(EXPENSE_URLS.EXPENSE_ACCOUNTS);
};

// APIs to add essentials

export const addExpenseAccountApi = (data) => {
  return instance.post(EXPENSE_URLS.EXPENSE_ACCOUNTS, data);
};

export const addProductHeadApi = (data) => {
  return instance.post(ESSENTIAL_URLS.PRODUCT_HEAD, data);
};

export const addWarehouseApi = (data) => {
  return instance.post(ESSENTIAL_URLS.WAREHOUSE, data);
};

export const addAccountTypeApi = (data) => {
  return instance.post(ESSENTIAL_URLS.ACCOUNT_TYPE, data);
};

export const addProductApi = (data) => {
  return instance.post(ESSENTIAL_URLS.PRODUCT, data);
};

export const addPersonApi = (data) => {
  return instance.post(ESSENTIAL_URLS.PERSON, data);
};
