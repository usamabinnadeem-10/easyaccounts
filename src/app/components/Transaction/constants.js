export const TABLE_HEAD = [
  {
    headerName: "Select",
  },
  {
    headerName: "Product",
  },
  {
    headerName: "Quantity",
  },
  {
    headerName: "Rate",
  },
  {
    headerName: "Discount",
  },
  {
    headerName: "Total",
  },
];

export const DEFAULTS = {
  SELECTED: "selected",
  PRODUCT: "product",
  QUANTITY: "quantity",
  RATE: "rate",
  DISCOUNT: "discount",
  TOTAL: "total",
};

export const TEXT_ROWS = [
  {
    name: DEFAULTS.QUANTITY,
  },
  {
    name: DEFAULTS.RATE,
  },
  {
    name: DEFAULTS.DISCOUNT,
  },
];

export const DEFAULT_ROW = {
  selected: false,
  product: null,
  quantity: null,
  rate: null,
  discount: null,
  total: null,
};
