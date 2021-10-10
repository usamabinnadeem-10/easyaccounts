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
    headerName: "Total",
  },
];

export const DEFAULTS = {
  SELECTED: "selected",
  PRODUCT: "product",
  QUANTITY: "quantity",
  RATE: "rate",
  TOTAL: "total",
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
  product: null,
  quantity: 0,
  rate: 0,
  total: 0,
};
