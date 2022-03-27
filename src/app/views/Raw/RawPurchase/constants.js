export const FIELDS = {
  person: "person",
  raw_product: "raw_product",
  manual_book_number: "manual_book_number",
  date: "date",
  warehouse: "warehouse",
  quantity: "quantity",
  yards_per_piece_actual: "yards_per_piece_actual",
  yards_per_piece_expected: "yards_per_piece_expected",
  formula: "formula",
  lots: "lots",
  lot_detail: "lot_detail",
  issue_dying: "issue_dying",
  dying_unit: "dying_unit",
  rate: "rate",
};

export const FIELD_TYPES = {
  STRING: "text",
  NUMBER: "number",
  SELECT: "select",
  DATE: "date",
  SWITCH: "switch",
};

export const LOT_DETAIL_INITIAL = {
  [FIELDS.quantity]: "",
  [FIELDS.yards_per_piece_actual]: "",
  [FIELDS.yards_per_piece_expected]: "",
  [FIELDS.formula]: "",
  [FIELDS.warehouse]: "",
  [FIELDS.rate]: "",
};

export const INITIAL_VALUES = {
  [FIELDS.person]: "",
  [FIELDS.manual_book_number]: "",
  [FIELDS.date]: "",
  [FIELDS.lots]: [
    {
      [FIELDS.raw_product]: "",
      [FIELDS.issue_dying]: "",
      [FIELDS.dying_unit]: "",
      [FIELDS.lot_detail]: [LOT_DETAIL_INITIAL],
    },
  ],
};
