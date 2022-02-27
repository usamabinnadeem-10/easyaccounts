import * as Yup from "yup";

import { FIELDS } from "./constants";

const REQUIRED = "Required";

export const CHEQUE = Yup.object().shape({
  [FIELDS.CHEQUE]: Yup.string().required(REQUIRED),
  [FIELDS.CHEQUE_NUMBER]: Yup.string().required(REQUIRED),
  [FIELDS.BANK]: Yup.string().required(REQUIRED),
  [FIELDS.DUE_DATE]: Yup.date().typeError("Invalid Date").required(REQUIRED),
  [FIELDS.DATE]: Yup.date().typeError("Invalid Date"),
  [FIELDS.AMOUNT]: Yup.number()
    .min(1, "Amount can not be less than 1")
    .typeError("Please enter a number")
    .required(REQUIRED),
});

export const OTHER = Yup.object().shape({
  [FIELDS.DATE]: Yup.date().typeError("Invalid Date"),
  [FIELDS.CHEQUE]: Yup.string().required(REQUIRED),
  [FIELDS.AMOUNT]: Yup.number()
    .min(1, "Amount can not be less than 1")
    .typeError("Please enter a number")
    .required(REQUIRED),
  [FIELDS.ACCOUNT_TYPE]: Yup.string().required(REQUIRED),
});
