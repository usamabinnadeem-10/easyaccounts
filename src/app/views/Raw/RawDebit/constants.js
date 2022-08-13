import { getToday } from '../../../utilities/stringUtils';

export const FIELDS = {
  person: 'person',
  raw_product: 'raw_product',
  manual_serial: 'manual_serial',
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
  rate: 'rate',
  transaction_type: 'transaction_type',
};

export const DETAIL_INITIAL = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.rate]: '',
  [FIELDS.warehouse]: '',
};

export const LOT_INITIAL = {
  [FIELDS.purchase_lot_number]: '',
  [FIELDS.detail]: [DETAIL_INITIAL],
};

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.manual_serial]: '',
  [FIELDS.transaction_type]: 'RINV',
  [FIELDS.date]: getToday(),
  [FIELDS.data]: [LOT_INITIAL],
};

export const RAW_TRANSACTION_TYPES = [
  {
    name: 'Sale',
    value: 'RINV',
    color: 'success',
    validate: false,
  },
  {
    name: 'Customer Return',
    value: 'RMWC',
    color: 'error',
    validate: true,
  },
  {
    name: 'Supplier Return',
    value: 'RMWS',
    color: 'info',
    validate: true,
  },
];
