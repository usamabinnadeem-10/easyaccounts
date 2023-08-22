import { getToday } from '../../../utilities/stringUtils';

export const FIELDS = {
  person: 'person',
  raw_product: 'raw_product',
  product_glue: 'product_glue',
  product_type: 'product_type',
  manual_serial: 'manual_serial',
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
  detail: 'detail',
  warehouse_number: 'warehouse_number',
  dying_number: 'dying_number',
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
  [FIELDS.rate_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.warehouse]: '',
  [FIELDS.rate]: '',
};

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.manual_serial]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.lots]: [
    {
      [FIELDS.raw_product]: '',
      [FIELDS.product_glue]: '',
      [FIELDS.product_type]: '',
      [FIELDS.issued]: false,
      [FIELDS.dying_unit]: '',
      [FIELDS.detail]: '',
      [FIELDS.warehouse_number]: '',
      [FIELDS.dying_number]: '',
      [FIELDS.lot_detail]: [LOT_DETAIL_INITIAL],
    },
  ],
};
