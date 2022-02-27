import moment from "moment";

export const FIELDS = {
  BANK: "bank",
  DUE_DATE: "due_date",
  AMOUNT: "amount",
  CHEQUE_NUMBER: "cheque_number",
  CHEQUE: "cheque",
  DATE: "date",
  ACCOUNT_TYPE: "account_type",
};

const INITIAL_VALUES = {
  [FIELDS.AMOUNT]: "",
  [FIELDS.CHEQUE]: "",
  [FIELDS.DATE]: moment(moment.now()).format("YYYY-MM-DD"),
};

export const getInitialValues = (chequeId, isChequeEntry) => {
  if (isChequeEntry) {
    return {
      ...INITIAL_VALUES,
      [FIELDS.CHEQUE_NUMBER]: "",
      [FIELDS.DUE_DATE]: "",
      [FIELDS.BANK]: "",
      [FIELDS.CHEQUE]: chequeId,
    };
  }
  return {
    ...INITIAL_VALUES,
    [FIELDS.ACCOUNT_TYPE]: "",
    [FIELDS.CHEQUE]: chequeId,
  };
};
