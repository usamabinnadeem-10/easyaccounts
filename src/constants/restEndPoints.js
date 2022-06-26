// export const BASE = "https://usamabinnadeem10.pythonanywhere.com/";
export const BASE = 'http://127.0.0.1:8000/';
// export const BASE = 'https://easyaccountsadmin.com/';

const AUTH = 'auth/';
const TOKEN = 'token/';
export const AUTH_URLS = {
  TOKEN: `${AUTH}${TOKEN}`,
  REFRESH_TOKEN: `${AUTH}${TOKEN}refresh/`,
  BRANCHES: `${AUTH}branches/`,
  LOGIN: `${AUTH}login/`,
  LOGOUT: `${AUTH}logout/`,
};

const ESSENTIALS = 'essentials/';
const CUSTOMER = 'C';
const SUPPLIER = 'S';
const LIST = 'list/';
const CREATE = 'create/';
const PERSON_TYPE = 'person_type';
export const ESSENTIAL_URLS = {
  LIST: {
    ACCOUNT_TYPE: `${ESSENTIALS}account-type/${LIST}`,
    WAREHOUSE: `${ESSENTIALS}warehouse/${LIST}`,
    PRODUCT: `${ESSENTIALS}product/${LIST}`,
    CUSTOMERS: `${ESSENTIALS}person/${LIST}?${PERSON_TYPE}=${CUSTOMER}`,
    SUPPLIERS: `${ESSENTIALS}person/${LIST}?${PERSON_TYPE}=${SUPPLIER}`,
    AREAS: `${ESSENTIALS}area/${LIST}`,
    CATEGORIES: `${ESSENTIALS}product-category/${LIST}`,
  },
  CREATE: {
    ACCOUNT_TYPE: `${ESSENTIALS}account-type/${CREATE}`,
    WAREHOUSE: `${ESSENTIALS}warehouse/${CREATE}`,
    PRODUCT: `${ESSENTIALS}product/${CREATE}`,
    PERSON: `${ESSENTIALS}person/${CREATE}`,
    AREA: `${ESSENTIALS}area/${CREATE}`,
    CATEGORY: `${ESSENTIALS}product-category/${CREATE}`,
    OPENING_STOCK: `${ESSENTIALS}create-opening-stock/`,
  },
  DAY_BOOK: `${ESSENTIALS}daybook/`,
  ACCOUNT_HISTORY: `${ESSENTIALS}account-history/`,
};

const EXPENSE = 'expense/';
const ACCOUNT = 'account/';
const DETAIL = 'detail/';
export const EXPENSE_URLS = {
  LIST_EXPENSES_ACCOUNTS: `${EXPENSE}${ACCOUNT}${LIST}`,
  CREATE_EXPENSE_ACCOUNT: `${EXPENSE}${ACCOUNT}${CREATE}`,
  LIST_EXPENSE_DETAILS: `${EXPENSE}${DETAIL}${LIST}`,
  CREATE_EXPENSE_DETAIL: `${EXPENSE}${DETAIL}${CREATE}`,
  GET_EXPENSE: `${EXPENSE}:uuid/`,
  DELETE_EXPENSE: `${EXPENSE}:uuid/`,
  EDIT_EXPENSE: `${EXPENSE}:uuid/`,
};

const TRANSACTION = 'transaction/';
const TRANSFER_STOCK = 'transfer-stock/';
export const TRANSACTION_URLS = {
  CREATE_TRANSACTION: `${TRANSACTION}`,
  DELETE_TRANSACTION: `${TRANSACTION}:uuid/`,
  GET_TRANSACTION: `${TRANSACTION}:uuid/`,
  TRANSFER_STOCK: `${TRANSACTION}${TRANSFER_STOCK}`,
  CANCEL_INVOICE: `${TRANSACTION}cancel-invoice/`,
  VIEW_DETAILED_STOCK: `${TRANSACTION}detailed-stock/`,
  PRODUCT_PERFORMANCE: `${TRANSACTION}product-performance-history/`,
  FILTER: `${TRANSACTION}search/`,
  LIST_TRANSFERS: `${TRANSACTION}view-transfers/`,
  DELETE_TRANSFER: `${TRANSACTION}${TRANSFER_STOCK}delete/:uuid/`,
  CANCEL_TRANSFER: `${TRANSACTION}${TRANSFER_STOCK}cancel/`,
  ALL_STOCK: `${TRANSACTION}all-stock/`,
};

const LEDGER = 'ledger/';
export const LEDGER_URLS = {
  CREATE_LEDGER: `${LEDGER}`,
  DELETE_LEDGER: `${LEDGER}:uuid/`,
  UPDATE_LEDGER: `${LEDGER}:uuid/`,
  ALL_BALANCES: `${LEDGER}balances/all/`,
};

const CHEQUE = 'cheque/';
const PERSONAL = 'personal/';
const EXTERNAL = 'external/';
const PASS = 'pass/';
const CANCEL = 'cancel/';
const RETURN = 'return/';
const TRANSFER = 'transfer/';
const DELETE = 'delete/';
export const CHEQUE_URLS = {
  PERSONAL: {
    ISSUE: `${CHEQUE}${PERSONAL}issue/`,
    LIST: `${CHEQUE}${PERSONAL}${LIST}`,
    PASS: `${CHEQUE}${PERSONAL}${PASS}:uuid/`,
    CANCEL: `${CHEQUE}${PERSONAL}${CANCEL}:uuid/`,
    RETURN: `${CHEQUE}${PERSONAL}${RETURN}`,
    RE_ISSUE: `${CHEQUE}${PERSONAL}${RETURN}reissue/`,
    DELETE: `${CHEQUE}${PERSONAL}${DELETE}:uuid/`,
  },
  EXTERNAL: {
    CREATE: `${CHEQUE}${EXTERNAL}${CREATE}`,
    LIST: `${CHEQUE}${EXTERNAL}${LIST}`,
    HISTORY: `${CHEQUE}${EXTERNAL}${LIST}cheque-history/`,
    CREATE_HISTORY: `${CHEQUE}${EXTERNAL}${CREATE}cheque-history/`,
    CREATE_HISTORY_WITH_CHEQUE: `${CHEQUE}${EXTERNAL}${CREATE}cheque-history-with-cheque/`,
    PASS: `${CHEQUE}${EXTERNAL}${PASS}`,
    TRANSFER: `${CHEQUE}${EXTERNAL}${TRANSFER}`,
    RETURN: `${CHEQUE}${EXTERNAL}${RETURN}`,
    RETURN_TRANSFER: `${CHEQUE}${EXTERNAL}${TRANSFER}${RETURN}`,
    DELETE: `${CHEQUE}${EXTERNAL}${DELETE}:uuid/`,
    COMPLETE_HISTORY: `${CHEQUE}${EXTERNAL}complete-history/`,
    COMPLETE_TRANSFER: `${CHEQUE}${EXTERNAL}complete-transfer/:uuid/`,
  },
};

export const CSC_URLS = {
  CITIES_BY_COUNTRY: `countries/PK/cities`,
};

const DYING = 'dying/';
const DYING_UNIT = 'dying-unit/';
export const DYING_APIS = {
  CREATE: {
    DYING_UNIT: `${DYING}${DYING_UNIT}${CREATE}`,
  },
  LIST: {
    DYING_UNIT: `${DYING}${DYING_UNIT}${LIST}`,
  },
};

const RAW = 'raw/';
const FORMULA = 'formula/';
const PRODUCT = 'product/';
export const RAW_APIS = {
  CREATE: {
    FORMULA: `${RAW}${FORMULA}${CREATE}`,
    PRODUCT: `${RAW}${PRODUCT}${CREATE}`,
    TRANSACTION: `${RAW}${TRANSACTION}${CREATE}`,
  },
  LIST: {
    FORMULA: `${RAW}${FORMULA}${LIST}`,
    PRODUCT: `${RAW}${PRODUCT}${LIST}`,
    LOT_NUMBERS: `${RAW}lot-numbers/${LIST}`,
  },
};
const EDIT = 'edit/';
const PAYMENT = 'payments/';
const IMAGE = 'image/';
export const PAYMENT_APIS = {
  CREATE: {
    PAYMENT: `${PAYMENT}${CREATE}`,
    IMAGE: `${PAYMENT}${IMAGE}${CREATE}`,
  },
  EDIT: {
    PAYMENT: `${PAYMENT}${EDIT}:uuid/`,
  },
  DELETE: {
    IMAGE: `${PAYMENT}${IMAGE}${DELETE}:uuid/`,
    PAYMENT: `${PAYMENT}${DELETE}:uuid/`,
  },
  LIST: {
    PAYMENT: `${PAYMENT}${LIST}`,
  },
};
