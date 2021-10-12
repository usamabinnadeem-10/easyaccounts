import { FIELDS } from "../../../constants/fieldTypes";

export const CUSTOMERS = [
  { value: "yert-4354-e234", label: "Haji Muhammad Ahmed" },
  { value: "qwte-gwe4-er77", label: "Usama Nadeem" },
  { value: "kiqt-ee24-er50", label: "Ali" },
];

export const PRODUCTS = [
  {
    value: "skqw-0oi8-98ji",
    label: "AK 44 Gaz",
  },
  {
    value: "btwf-gadz-87hd",
    label: "AK 66 Gaz",
  },
];

export const COLORS = {
  "skqw-0oi8-98ji": [
    { value: "skqw-0oi8-98ji", label: "1" },
    { value: "btwf-gadz-87hd", label: "2" },
    { value: "skqw-0oi86234-98ji", label: "3" },
    { value: "btwf-ga412dz-87hd", label: "4" },
  ],
  "btwf-gadz-87hd": [
    { value: "skqw-0oi8-98ji", label: "10" },
    { value: "bt4f-gadz-87hd", label: "12" },
    { value: "sk14w-0oi8-98ji", label: "17" },
    { value: "btwf-g123adz-87hd", label: "20" },
    { value: "skqw-0o123i8-98ji", label: "34" },
    { value: "btwf-142gadz-87hd", label: "101" },
  ],
};

export const TRANSACTION_TYPES = [
  {
    name: "Cash",
    value: "cash",
    color: "success",
  },
  {
    name: "Credit",
    value: "credit",
    color: "error",
  },
];

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
    options: PRODUCTS,
  },
  {
    field: FIELDS.SELECT,
    default: null,
    name: "Color",
    optional: false,
    options: null,
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
  quantity: 0,
  rate: 0,
  total: 0,
};

export const META_CONSTANTS = {
  user: "user",
  date: "date",
  transactionType: "transactionType",
};
