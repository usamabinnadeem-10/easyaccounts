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
  rate_gazaana: 'rate_gazaana',
  formula: 'formula',
  data: 'data',
  lot_detail: 'lot_detail',
  lot_number: 'lot_number',
  detail: 'detail',
  rate: 'rate',
  debit_type: 'debit_type',
};

export const DETAIL_INITIAL = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.rate]: '',
  [FIELDS.warehouse]: '',
  [FIELDS.rate_gazaana]: '',
};

export const LOT_INITIAL = {
  [FIELDS.lot_number]: '',
  [FIELDS.detail]: [DETAIL_INITIAL],
};

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.manual_serial]: '',
  [FIELDS.debit_type]: 'sale',
  [FIELDS.date]: getToday(),
  [FIELDS.data]: [LOT_INITIAL],
};

export const RAW_DEBIT_TYPES = [
  {
    name: 'Sale',
    value: 'sale',
    color: 'success',
    validate: false,
  },
  {
    name: 'Sale Return',
    value: 'sale_return',
    color: 'error',
    validate: true,
  },
  {
    name: 'Purchase Return',
    value: 'purchase_return',
    color: 'info',
    validate: false,
  },
];
