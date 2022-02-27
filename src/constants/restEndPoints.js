// export const BASE = "https://usamabinnadeem10.pythonanywhere.com/";
// export const BASE = "http://127.0.0.1:8000/";
export const BASE = "https://3f60-39-59-98-82.ngrok.io";

const ESSENTIALS = "essentials/";
const CUSTOMER = "C";
const SUPPLIER = "S";
const LIST = "list/";
const CREATE = "create/";
const PERSON_TYPE = "person_type";
export const ESSENTIAL_URLS = {
  LIST: {
    ACCOUNT_TYPE: `${ESSENTIALS}account-type/${LIST}`,
    WAREHOUSE: `${ESSENTIALS}warehouse/${LIST}`,
    PRODUCT: `${ESSENTIALS}product/${LIST}`,
    CUSTOMERS: `${ESSENTIALS}person/${LIST}?${PERSON_TYPE}=${CUSTOMER}`,
    SUPPLIERS: `${ESSENTIALS}person/${LIST}?${PERSON_TYPE}=${SUPPLIER}`,
  },
  CREATE: {
    ACCOUNT_TYPE: `${ESSENTIALS}account-type/${CREATE}`,
    WAREHOUSE: `${ESSENTIALS}warehouse/${CREATE}`,
    PRODUCT: `${ESSENTIALS}product/${CREATE}`,
    PERSON: `${ESSENTIALS}person/${CREATE}`,
  },
  DAY_BOOK: `${ESSENTIALS}daybook/`,
  ALL_STOCK: `${ESSENTIALS}stock-quantity/`,
};

const EXPENSE = "expense/";
const ACCOUNT = "account/";
const DETAIL = "detail/";
export const EXPENSE_URLS = {
  LIST_EXPENSES_ACCOUNTS: `${EXPENSE}${ACCOUNT}${LIST}`,
  CREATE_EXPENSE_ACCOUNT: `${EXPENSE}${ACCOUNT}${CREATE}`,
  LIST_EXPENSE_DETAILS: `${EXPENSE}${DETAIL}${LIST}`,
  CREATE_EXPENSE_DETAIL: `${EXPENSE}${DETAIL}${CREATE}`,
  GET_EXPENSE: `${EXPENSE}:uuid/`,
  DELETE_EXPENSE: `${EXPENSE}:uuid/`,
  EDIT_EXPENSE: `${EXPENSE}:uuid/`,
};

const TRANSACTION = "transaction/";
export const TRANSACTION_URLS = {
  CREATE_TRANSACTION: `${TRANSACTION}`,
  DELETE_TRANSACTION: `${TRANSACTION}:uuid/`,
  GET_TRANSACTION: `${TRANSACTION}:uuid/`,
  TRANSFER_STOCK: `${TRANSACTION}transfer-stock/`,
  CANCEL_INVOICE: `${TRANSACTION}cancel-invoice/`,
  VIEW_DETAILED_STOCK: `${TRANSACTION}detailed-stock/`,
  PRODUCT_PERFORMANCE: `${TRANSACTION}product-performance-history/`,
};

const LEDGER = "ledger/";
export const LEDGER_URLS = {
  CREATE_LEDGER: `${LEDGER}`,
  DELETE_LEDGER: `${LEDGER}:uuid/`,
  UPDATE_LEDGER: `${LEDGER}:uuid/`,
  ALL_BALANCES: `${LEDGER}balances/all/`,
};

const CHEQUE = "cheque/";
const PERSONAL = "personal/";
const EXTERNAL = "external/";
const PASS = "pass/";
const CANCEL = "cancel/";
const RETURN = "return/";
const TRANSFER = "transfer/";
export const CHEQUE_URLS = {
  PERSONAL: {
    ISSUE: `${CHEQUE}${PERSONAL}issue/`,
    LIST: `${CHEQUE}${PERSONAL}${LIST}`,
    PASS: `${CHEQUE}${PERSONAL}${PASS}:uuid/`,
    CANCEL: `${CHEQUE}${PERSONAL}${CANCEL}:uuid/`,
    RETURN: `${CHEQUE}${PERSONAL}${RETURN}`,
    RE_ISSUE: `${CHEQUE}${PERSONAL}${RETURN}reissue/`,
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
  },
};
