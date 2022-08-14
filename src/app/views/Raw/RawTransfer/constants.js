import { getToday } from '../../../utilities/stringUtils';

export const FIELDS = {
  person: 'person',
  raw_product: 'raw_product',
  manual_serial: 'manual_serial',
  from_warehouse: 'from_warehouse',
  date: 'date',
  warehouse: 'warehouse',
  quantity: 'quantity',
  actual_gazaana: 'actual_gazaana',
  expected_gazaana: 'expected_gazaana',
  formula: 'formula',
  data: 'data',
  lot_detail: 'lot_detail',
  purchase_lot_number: 'purchase_lot_number',
  detail: 'detail',
};

export const DETAIL_INITIAL = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.warehouse]: '',
};

export const LOT_INITIAL = {
  [FIELDS.purchase_lot_number]: '',
  [FIELDS.detail]: [DETAIL_INITIAL],
};

export const INITIAL_VALUES = {
  [FIELDS.manual_serial]: '',
  [FIELDS.from_warehouse]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.data]: [LOT_INITIAL],
};
