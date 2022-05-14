export const FIELDS = {
  to_warehouse: 'to_warehouse',
  warehouse: 'warehouse',
  quantity: 'quantity',
  actual_gazaana: 'actual_gazaana',
  expected_gazaana: 'expected_gazaana',
  formula: 'formula',
  rate: 'rate',
};

const COMMON = {
  [FIELDS.quantity]: '',
  [FIELDS.actual_gazaana]: '',
  [FIELDS.expected_gazaana]: '',
  [FIELDS.formula]: '',
  [FIELDS.warehouse]: '',
};

export const INITIAL = {
  other: {
    ...COMMON,
    [FIELDS.rate]: '',
  },
  transfer: {
    [FIELDS.to_warehouse]: '',
  },
};
