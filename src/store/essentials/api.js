import instance from '../../utils/axiosApi';

import { cscInstance } from '../../utils/axiosApi';

import {
  ESSENTIAL_URLS,
  EXPENSE_URLS,
  TRANSACTION_URLS,
  CSC_URLS,
} from '../../constants/restEndPoints';

// APIs to get essentials

export const getAccountsApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.ACCOUNT_TYPE);
};

export const getWarehouseApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.WAREHOUSE);
};

export const getAllPersonApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.PERSONS);
};

export const getCustomersApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.CUSTOMERS);
};

export const getSuppliersApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.SUPPLIERS);
};

export const getEquityApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.EQUITY);
};

export const getAdvanceExpensesApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.ADVANCE_EXPENSES);
};

export const getProductApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.PRODUCT);
};

export const getExpenseAccountsApi = () => {
  return instance.get(EXPENSE_URLS.LIST_EXPENSES_ACCOUNTS);
};

export const getAreasApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.AREAS);
};

export const getCategoriesApi = () => {
  return instance.get(ESSENTIAL_URLS.LIST.CATEGORIES);
};

export const getCitiesApi = () => {
  return cscInstance.get(CSC_URLS.CITIES_BY_COUNTRY);
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

export const addAreaApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.AREA, data);
};

export const addCategoryApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.CATEGORY, data);
};

export const addOpeningStockApi = (data) => {
  return instance.post(ESSENTIAL_URLS.CREATE.OPENING_STOCK, data);
};
