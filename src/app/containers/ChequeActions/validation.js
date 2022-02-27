import * as Yup from "yup";

import { ACTION_TYPES } from "./constants";

const REQUIRED = "required";
const defaultSchema = Yup.object().shape({
  cheque: Yup.string().required(REQUIRED),
});

const personSchema = defaultSchema.concat(
  Yup.object().shape({
    person: Yup.string().required(REQUIRED),
  })
);

const accountSchema = defaultSchema.concat(
  Yup.object().shape({
    account_type: Yup.string().required(REQUIRED),
  })
);

export const getSchema = (isPersonal, actionType) => {
  if (isPersonal) {
    switch (actionType) {
      case ACTION_TYPES.PERSONAL.PASS ||
        ACTION_TYPES.PERSONAL.CANCEL ||
        ACTION_TYPES.PERSONAL.RETURN:
        return defaultSchema;
      case ACTION_TYPES.PERSONAL.RE_ISSUE:
        return personSchema;
      default:
        return defaultSchema;
    }
  } else {
    switch (actionType) {
      case ACTION_TYPES.EXTERNAL.PASS:
        return accountSchema;
      case ACTION_TYPES.EXTERNAL.TRANSFER:
        return personSchema;
      case ACTION_TYPES.EXTERNAL.RETURN ||
        ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED:
        return defaultSchema;
      default:
        return defaultSchema;
    }
  }
};
