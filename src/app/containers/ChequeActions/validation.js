import * as Yup from 'yup';

import { ACTION_TYPES } from './constants';

const REQUIRED = 'required';
const defaultSchema = Yup.object().shape({
  cheque: Yup.string().required(REQUIRED),
});

const personSchema = defaultSchema.concat(
  Yup.object().shape({
    person: Yup.object().required(REQUIRED),
  })
);

const accountSchema = defaultSchema.concat(
  Yup.object().shape({
    account_type: Yup.object().required(REQUIRED),
  })
);

const personAndDateSchema = personSchema.concat(
  Yup.object().shape({
    date: Yup.date().required(REQUIRED),
  })
);

const defaultAndDateSchema = defaultSchema.concat(
  Yup.object().shape({
    date: Yup.date().required(REQUIRED),
  })
);

export const getSchema = (isPersonal, actionType) => {
  if (isPersonal) {
    switch (actionType) {
      case ACTION_TYPES.PERSONAL.PASS || ACTION_TYPES.PERSONAL.CANCEL:
        return defaultSchema;
      case ACTION_TYPES.PERSONAL.RETURN:
        return defaultAndDateSchema;
      case ACTION_TYPES.PERSONAL.RE_ISSUE:
        return personAndDateSchema;
      default:
        return defaultSchema;
    }
  } else {
    switch (actionType) {
      case ACTION_TYPES.EXTERNAL.PASS:
        return accountSchema;
      case ACTION_TYPES.EXTERNAL.TRANSFER:
        return personAndDateSchema;
      case ACTION_TYPES.EXTERNAL.RETURN ||
        ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED:
        return defaultAndDateSchema;
      default:
        return defaultSchema;
    }
  }
};
