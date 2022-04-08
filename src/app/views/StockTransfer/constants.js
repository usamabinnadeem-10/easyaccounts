export const FIELDS = {
  DATE: 'date',
  TRANSFER_DETAIL: 'transfer_detail',
  STOCK_ID: 'stock_id',
  TO_WAREHOUSE: 'to_warehouse',
  QUANTITY: 'quantity',
};

export const INITIAL_VALUES = {
  [FIELDS.DATE]: '',
  [FIELDS.TRANSFER_DETAIL]: [
    {
      [FIELDS.STOCK_ID]: '',
      [FIELDS.TO_WAREHOUSE]: '',
      [FIELDS.QUANTITY]: '',
    },
  ],
};
