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
  [FIELDS.date]: Yup.date().typeError("Invalid date").required(REQUIRED),
  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.product]: objectSchema,
      [FIELDS.warehouse]: objectSchema,
      [FIELDS.quantity]: numberSchema,
      [FIELDS.calculated_rate]: numberSchema,
      [FIELDS.rate_yards]: numberSchema,
      [FIELDS.actual_yards]: numberSchema,
      [FIELDS.unit]: objectSchema,
      [FIELDS.rate]: numberSchema,
      [FIELDS.total]: numberSchema,
      [FIELDS.total_yards]: numberSchema,
    })
  ),
});
