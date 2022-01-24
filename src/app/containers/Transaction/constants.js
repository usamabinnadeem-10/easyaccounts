import { FIELDS } from "../../../constants/fieldTypes";

export const DEFAULTS = {
  SELECTED: "selected",
  PRODUCT: "product",
  QUANTITY: "quantity",
  RATE: "rate",
  TOTAL: "total",
  WAREHOUSE: "warehouse",
  GAZAANA: "gazaana",
  TOTAL_GAZAANA: "total_gazaana",
};

export const TEXT_ROWS = [
  {
    name: DEFAULTS.QUANTITY,
  },
  {
    name: DEFAULTS.RATE,
  },
];

export const DEFAULT_ROW = {
  selected: false,
  gazaana: 0,
  product: null,
  quantity: 0,
  rate: 0,
  total_gazaana: 0,
  total: 0,
};

export const ERROR_DEFAULTS = {
  LOW_TOTAL: "Total is very low",
  NO_MORE_PRODUCTS: "You do not have any more products to add",
  ROW_INCOMPLETE: "Please complete adding the current product",
  NO_PERSON: "Please select a ",
  NO_ROW: "Transaction is empty",
  NO_ACCOUNT: "Please select an account type",
  NO_PAID_AMOUNT: "Please enter the amount paid",
  NO_MANUAL_INVOICE: "Please enter manual invoice number",
  OOPS: "Oops, something went wrong",
};

export const FIELD_TYPES = {
  CHECKBOX: FIELDS.CHECKBOX,
  SELECT: FIELDS.SELECT,
  NUMBER: FIELDS.NUMBER,
};
