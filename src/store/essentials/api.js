import instance from "../../utils/axiosApi";

import {
  ESSENTIAL_URLS,
  EXPENSE_URLS,
  TRANSACTION_URLS,
} from "../../constants/restEndPoints";

// APIs to get essentials

export const getAccountsApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.ACCOUNT_TYPE);
};

export const getWarehouseApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.WAREHOUSE);
};

export const getCustomersApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.CUSTOMERS);
};

export const getSuppliersApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.SUPPLIERS);
};

export const getProductApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.PRODUCT);
};

export const getExpenseAccountsApi = () => {
  return instance.get(EXPENSE_URLS.LIST_EXPENSES_ACCOUNTS);
};

// APIs to add essentials

export const addExpenseAccountApi = (data) => {
  return instance.post(EXPENSE_URLS.CREATE_EXPENSE_ACCOUNT, data);
};

export const addWarehouseApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.WAREHOUSE, data);
};

export const addAccountTypeApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.ACCOUNT_TYPE, data);
};

export const addProductApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.PRODUCT, data);
};

export const addPersonApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.PERSON, data);
};

export const addExpenseDetailApi = (data) => {
  return instance.post(EXPENSE_URLS.CREATE_EXPENSE_DETAIL, data);
};

export const cancelInvoiceApi = (data) => {
  return instance.post(TRANSACTION_URLS.CANCEL_INVOICE, data);
};
