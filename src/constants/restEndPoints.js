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
};
