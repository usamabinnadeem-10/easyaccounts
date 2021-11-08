import { FIELDS } from "../../../constants/fieldTypes";

export const TRANSACTION_TYPES = [
  {
    name: "Purchase",
    value: "purchase",
    color: "success",
    validate: false,
  },
  {
    name: "Maal Wapsi",
    value: "maal_wapsi",
    color: "info",
    validate: true,
  },
];

export const NATURES = {
  purchase: "C",
  maal_wapsi: "D",
};

export const TABLE_META = [
  {
    field: FIELDS.CHECKBOX,
    default: false,
    name: "Select",
  },
  {
    field: FIELDS.SELECT,
    default: null,
    name: "Product",
    optional: false,
  },
  {
    field: FIELDS.SELECT,
    default: null,
    name: "Color",
    optional: false,
    options: null,
  },
  {
    field: FIELDS.SELECT,
    default: null,
    name: "Warehouse",
    optional: false,
  },
  {
    field: FIELDS.NUMBER,
    default: 0,
    name: "Quantity",
    optional: false,
    readOnly: false,
  },
  {
    field: FIELDS.NUMBER,
    default: 0,
    name: "Rate",
    optional: false,
    readOnly: false,
  },
  {
    field: FIELDS.NUMBER,
    default: 0,
    name: "Total",
    optional: false,
    readOnly: true,
  },
];

export const DEFAULT_ROW = {
  selected: false,
  color: null,
  product: null,
  warehouse: null,
  quantity: 0,
  rate: 0,
  total: 0,
};

export const META_CONSTANTS = {
  user: "user",
  date: "date",
  transactionType: "transactionType",
};
