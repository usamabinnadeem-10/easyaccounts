export const FIELDS = {
  person: 'person',
  raw_product: 'raw_product',
  manual_invoice_serial: 'manual_invoice_serial',
  date: 'date',
  warehouse: 'warehouse',
  quantity: 'quantity',
  actual_gazaana: 'actual_gazaana',
  expected_gazaana: 'expected_gazaana',
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

export const LOT_DETAIL_INITIAL = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.warehouse]: '',
  [FIELDS.rate]: '',
};

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.manual_invoice_serial]: '',
  [FIELDS.date]: '',
  [FIELDS.lots]: [
    {
      [FIELDS.raw_product]: '',
      [FIELDS.issued]: false,
      [FIELDS.dying_unit]: '',
      [FIELDS.lot_detail]: [LOT_DETAIL_INITIAL],
    },
  ],
};
