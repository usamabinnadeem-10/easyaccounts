import * as actionTypes from './actionTypes';

export const cacheLowStock = (data) => {
  return {
    type: actionTypes.CACHE_LOW_STOCK,
    payload: data,
  };
};

export const cacheAllStock = (data) => {
  return {
    type: actionTypes.CACHE_ALL_STOCK,
    payload: data,
  };
};

export const cacheDetailedStock = (data) => {
  return {
    type: actionTypes.CACHE_DETAILED_STOCK,
    payload: data,
  };
};

export const cacheAccountHistory = (data) => {
  return {
    type: actionTypes.CACHE_ACCOUNT_HISTORY,
    payload: data,
  };
};

export const cacheLedger = (data) => {
  return {
    type: actionTypes.CACHE_LEDGER,
    payload: data,
  };
};

export const cachePaymentList = (data) => {
  return {
    type: actionTypes.CACHE_PAYMENT_LIST,
    payload: data,
  };
};

export const cacheAllBalances = (data) => {
  return {
    type: actionTypes.CACHE_ALL_BALANCES,
    payload: data,
  };
};

export const cacheProductPerformance = (data) => {
  return {
    type: actionTypes.CACHE_PRODUCT_PERFORMANCE,
    payload: data,
  };
};

export const cacheTransactionList = (data) => {
  return {
    type: actionTypes.CACHE_TRANSACTION_LIST,
    payload: data,
  };
};

export const cacheExpenseList = (data) => {
  return {
    type: actionTypes.CACHE_EXPENSE_LIST,
    payload: data,
  };
};

export const cacheRawTransactionsList = (data) => {
  return {
    type: actionTypes.CACHE_RAW_TRANSACTIONS_LIST,
    payload: data,
  };
};
