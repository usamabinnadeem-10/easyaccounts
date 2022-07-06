export const FIELDS = {
  DATE: 'date',
  TRANSFER_DETAIL: 'transfer_detail',
  PRODUCT: 'product',
  GAZAANA: 'yards_per_piece',
  FROM_WAREHOUSE: 'from_warehouse',
  TO_WAREHOUSE: 'to_warehouse',
  QUANTITY: 'quantity',
  MANUAL_SERIAL: 'manual_invoice_serial',
};

export const INITIAL_VALUES = {
  [FIELDS.DATE]: '',
  [FIELDS.FROM_WAREHOUSE]: '',
  // [FIELDS.MANUAL_SERIAL]: '',
  [FIELDS.TRANSFER_DETAIL]: [
    {
      [FIELDS.PRODUCT]: '',
      [FIELDS.GAZAANA]: '',
      [FIELDS.TO_WAREHOUSE]: '',
      [FIELDS.QUANTITY]: '',
    },
  ],
};
