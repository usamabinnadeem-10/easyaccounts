import { getToday } from '../../../utilities/stringUtils';

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
  data: 'data',
  lot_detail: 'lot_detail',
  lot_number: 'lot_number',
  detail: 'detail',
  debit_type: 'debit_type',
  to_warehouse: 'to_warehouse',
};

export const DETAIL_INITIAL = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.to_warehouse]: '',
  [FIELDS.warehouse]: '',
};

export const LOT_INITIAL = {
  [FIELDS.lot_number]: '',
  [FIELDS.detail]: [DETAIL_INITIAL],
};

export const INITIAL_VALUES = {
  [FIELDS.manual_invoice_serial]: '',
  [FIELDS.debit_type]: 'Transfer',
  [FIELDS.date]: getToday(),
  [FIELDS.data]: [LOT_INITIAL],
};
