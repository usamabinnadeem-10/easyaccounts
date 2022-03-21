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
  formula_numerator: "formula_numerator",
  formula_denominator: "formula_denominator",
  detail: "detail",
};

export const INITIAL_VALUES = {
  [FIELDS.dying_unit]: "",
  [FIELDS.raw_product]: "",
  [FIELDS.manual_book_number]: "",
  [FIELDS.date]: "",
  [FIELDS.warehouse]: "",
  [FIELDS.detail]: [
    {
      [FIELDS.quantity]: "",
      [FIELDS.yards_per_piece_actual]: "",
      [FIELDS.yards_per_piece_expected]: "",
      [FIELDS.calculated_yards_per_piece]: "",
      [FIELDS.calculated_expected]: "",
      [FIELDS.formula_numerator]: "",
      [FIELDS.formula_denominator]: "",
    },
  ],
};

export const TEXT_FIELDS = [
  {
    name: FIELDS.quantity,
    label: "Thaan",
  },
  {
    name: FIELDS.formula_numerator,
    label: "F-1",
  },
  {
    name: FIELDS.formula_denominator,
    label: "F-2",
  },
  {
    name: FIELDS.yards_per_piece_actual,
    label: "Actual",
  },
  {
    name: FIELDS.yards_per_piece_expected,
    label: "Expected",
  },
];

export const TOTALS = [
  FIELDS.quantity,
  FIELDS.calculated_yards_per_piece,
  FIELDS.calculated_expected,
];
