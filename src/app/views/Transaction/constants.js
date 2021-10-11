export const TABLE_HEAD = [
  {
    headerName: "Select",
  },
  {
    headerName: "Product",
  },
  {
    headerName: "Color",
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
  COLOR: "color",
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
  color: null,
  product: null,
  quantity: 0,
  rate: 0,
  total: 0,
};

export const ERROR_DEFAULTS = {
  LOW_TOTAL: "Total is very low",
  NO_MORE_PRODUCTS: "You do not have any more products to add",
  ROW_INCOMPLETE: "Please complete adding the current product",
}