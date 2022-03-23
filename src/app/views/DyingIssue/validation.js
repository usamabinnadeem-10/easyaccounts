import * as Yup from "yup";

import { FIELDS } from "./constants";

const REQUIRED = "Required";
const NUMBER_ERROR = "Please enter a value greater than 0";

const objectSchema = Yup.object().typeError(REQUIRED).required(REQUIRED);

const numberSchema = Yup.number()
  .typeError(REQUIRED)
  .min(0, NUMBER_ERROR)
  .required(REQUIRED);

export const validationSchema = Yup.object().shape({
  [FIELDS.dying_unit]: objectSchema,
  [FIELDS.raw_product]: objectSchema,
  [FIELDS.manual_book_number]: numberSchema,
  [FIELDS.date]: Yup.date().typeError("Invalid date").required(REQUIRED),
  [FIELDS.warehouse]: objectSchema,

  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.quantity]: numberSchema,
      [FIELDS.yards_per_piece_actual]: numberSchema,
      [FIELDS.yards_per_piece_expected]: numberSchema,
      [FIELDS.calculated_yards_per_piece]: numberSchema,
      [FIELDS.calculated_expected]: numberSchema,
      [FIELDS.formula_numerator]: numberSchema,
      [FIELDS.formula_denominator]: numberSchema,
    })
  ),
});
