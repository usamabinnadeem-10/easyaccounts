export const FIELDS = {
  dying_unit: "dying_unit",
  raw_product: "raw_product",
  manual_book_number: "manual_book_number",
  date: "date",
  warehouse: "warehouse",
  quantity: "quantity",
  yards_per_piece_actual: "yards_per_piece_actual",
  yards_per_piece_expected: "yards_per_piece_expected",
  calculated_yards_per_piece: "calculated_yards_per_piece",
  calculated_expected: "calculated_expected",
  rate_yards: "rate_yards",
  actual_yards: "actual_yards",
  detail: "detail",
  unit: "unit",
  rate: "rate",
  total_yards: "total_yards",
  total: "total",
  product: "product",
  calculated_rate: "calculated_rate",
};

export const INITIAL_VALUES = {
  [FIELDS.date]: "",
  [FIELDS.detail]: [
    {
      [FIELDS.product]: "",
      [FIELDS.warehouse]: "",
      [FIELDS.quantity]: "",
      [FIELDS.calculated_rate]: "",
      [FIELDS.rate_yards]: "",
      [FIELDS.actual_yards]: "",
      [FIELDS.unit]: "",
      [FIELDS.rate]: "",
      [FIELDS.total]: "",
      [FIELDS.total_yards]: "",
    },
  ],
};
