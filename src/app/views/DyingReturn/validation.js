import * as Yup from "yup";

import { FIELDS } from "./constants";

const REQUIRED = "Required";
const NUMBER_ERROR = "Please enter a value greater than 0";
export const validationSchema = Yup.object().shape({
  [FIELDS.date]: Yup.date().typeError("Invalid date").required(REQUIRED),
  [FIELDS.detail]: Yup.array().of(
    Yup.object().shape({
      [FIELDS.product]: Yup.object().typeError(REQUIRED).required(REQUIRED),
      [FIELDS.warehouse]: Yup.object().typeError(REQUIRED).required(REQUIRED),
      [FIELDS.quantity]: Yup.number().min(0, NUMBER_ERROR).required(REQUIRED),
      [FIELDS.calculated_rate]: Yup.number()
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.rate_yards]: Yup.number().min(0, NUMBER_ERROR).required(REQUIRED),
      [FIELDS.actual_yards]: Yup.number()
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
      [FIELDS.unit]: Yup.object().typeError(REQUIRED).required(REQUIRED),
      [FIELDS.rate]: Yup.number().min(0, NUMBER_ERROR).required(REQUIRED),
      [FIELDS.total]: Yup.number().min(0, NUMBER_ERROR).required(REQUIRED),
      [FIELDS.total_yards]: Yup.number()
        .min(0, NUMBER_ERROR)
        .required(REQUIRED),
    })
  ),
});
