import * as Yup from "yup";

import { FIELDS } from "./constants";

const REQUIRED = "Required";

export const personalSchema = Yup.object().shape({
  [FIELDS.person]: Yup.string().required(REQUIRED),
  [FIELDS.cheque_number]: Yup.string().required(REQUIRED),
  [FIELDS.bank]: Yup.string().required(REQUIRED),
  [FIELDS.account_type]: Yup.string().required(REQUIRED),
  [FIELDS.due_date]: Yup.date().typeError("Invalid Date").required(REQUIRED),
  [FIELDS.date]: Yup.date().typeError("Invalid Date"),
  [FIELDS.amount]: Yup.number()
    .min(1, "Amount can not be less than 1")
    .typeError("Please enter a number")
    .required(REQUIRED),
});

export const externalSchema = Yup.object().shape({
  [FIELDS.person]: Yup.string().required(REQUIRED),
  [FIELDS.cheque_number]: Yup.string().required(REQUIRED),
  [FIELDS.bank]: Yup.string().required(REQUIRED),
  [FIELDS.due_date]: Yup.date().typeError("Invalid Date").required(REQUIRED),
  [FIELDS.date]: Yup.date().typeError("Invalid Date"),
  [FIELDS.amount]: Yup.number()
    .min(1, "Amount can not be less than 1")
    .typeError("Please enter a number")
    .required(REQUIRED),
});
