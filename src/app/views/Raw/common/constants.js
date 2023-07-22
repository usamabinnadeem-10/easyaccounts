export const FIELDS = {
  person: 'person',
  raw_product: 'raw_product',
  manual_invoice_serial: 'manual_invoice_serial',
  date: 'date',
  warehouse: 'warehouse',
  quantity: 'quantity',
  actual_gazaana: 'actual_gazaana',
  expected_gazaana: 'expected_gazaana',
  rate_gazaana: 'rate_gazaana',
  formula: 'formula',
  lots: 'lots',
  lot_detail: 'lot_detail',
  issued: 'issued',
  dying_unit: 'dying_unit',
  rate: 'rate',
};

export const FIELD_TYPES = {
  STRING: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  DATE: 'date',
  SWITCH: 'switch',
};

export const PRODUCT_GLUES = [
  {
    value: 'LG',
    label: 'Low Glue',
  },
  {
    value: 'HG',
    label: 'High Glue',
  },
  {
    value: 'CFG',
    label: 'Centrifugal',
  },
];

export const PRODUCT_TYPES = [
  {
    label: 'Baara',
    value: 'Baara',
  },
  {
    label: 'Standard',
    value: 'Standard',
  },
];
