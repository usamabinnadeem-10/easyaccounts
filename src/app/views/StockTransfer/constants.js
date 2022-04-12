export const FIELDS = {
  DATE: 'date',
  TRANSFER_DETAIL: 'transfer_detail',
  PRODUCT: 'product',
  GAZAANA: 'yards_per_piece',
  WAREHOUSE: 'from_warehouse',
  TO_WAREHOUSE: 'to_warehouse',
  QUANTITY: 'quantity',
};

export const INITIAL_VALUES = {
  [FIELDS.DATE]: '',
  [FIELDS.TRANSFER_DETAIL]: [
    {
      [FIELDS.PRODUCT]: '',
      [FIELDS.GAZAANA]: '',
      [FIELDS.WAREHOUSE]: '',
      [FIELDS.TO_WAREHOUSE]: '',
      [FIELDS.QUANTITY]: '',
    },
  ],
};
