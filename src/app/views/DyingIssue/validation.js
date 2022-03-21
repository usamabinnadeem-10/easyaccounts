import * as Yup from "yup";

import { FIELDS } from "./constants";

const REQUIRED = "Required";
const NUMBER_ERROR = "Please enter a value greater than 0";
export const validationSchema = Yup.object().shape({
  [FIELDS.dying_unit]: Yup.object().typeError(REQUIRED).required(REQUIRED),
  [FIELDS.raw_product]: Yup.object().typeError(REQUIRED).required(REQUIRED),
  [FIELDS.manual_book_number]: Yup.number()
    .typeError(REQUIRED)
    .min(0, NUMBER_ERROR)
    .required(REQUIRED),
  [FIELDS.date]: Yup.date().typeError("Invalid date").required(REQUIRED),
  [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).required(REQUIRED),

  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.quantity]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.yards_per_piece_actual]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.yards_per_piece_expected]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.calculated_yards_per_piece]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.calculated_expected]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.formula_numerator]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.formula_denominator]: Yup.number()
        .typeError(REQUIRED)
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
    })
  ),
});
