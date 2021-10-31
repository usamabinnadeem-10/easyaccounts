export const BASE = "http://127.0.0.1:8000/";

const ESSENTIALS = "essentials/";
const CUSTOMER = "C";
const SUPPLIER = "S";
export const ESSENTIAL_URLS = {
  ACCOUNT_TYPE: `${ESSENTIALS}account-type/`,
  WAREHOUSE: `${ESSENTIALS}warehouse/`,
  PRODUCT: `${ESSENTIALS}product/`,
  PRODUCT_HEAD: `${ESSENTIALS}product-head/`,
  CUSTOMERS: `${ESSENTIALS}person/?person=${CUSTOMER}`,
  SUPPLIERS: `${ESSENTIALS}person/?person=${SUPPLIER}`,
  PERSON: `${ESSENTIALS}person/`,
};

const EXPENSE = "expense/";
export const EXPENSE_URLS = {
  EXPENSE_ACCOUNTS: `${EXPENSE}account/`,
  EXPENSE_DETAIL: `${EXPENSE}detail/`,
  GET_EXPENSE: `${EXPENSE}:uuid/`,
};

const TRANSACTION = "transaction/";
export const TRANSACTION_URLS = {
  CREATE_TRANSACTION: `${TRANSACTION}`,
  DELETE_TRANSACTION: `${TRANSACTION}:uuid/`,
  GET_TRANSACTION: `${TRANSACTION}:uuid/`,
};

const LEDGER = "ledger/";
export const LEDGER_URLS = {
  CREATE_LEDGER: `${LEDGER}`,
  DELETE_LEDGER: `${LEDGER}:uuid/`,
  UPDATE_LEDGER: `${LEDGER}:uuid/`,
};
