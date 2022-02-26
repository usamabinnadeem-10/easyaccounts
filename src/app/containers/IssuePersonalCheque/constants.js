export const FIELDS = {
  person: "person",
  cheque_number: "cheque_number",
  account_type: "account_type",
  bank: "bank",
  due_date: "due_date",
  amount: "amount",
  date: "date",
};

export const INITIAL_VALUES = {
  [FIELDS.person]: "",
  [FIELDS.cheque_number]: "",
  [FIELDS.account_type]: "",
  [FIELDS.bank]: "",
  [FIELDS.due_date]: "",
  [FIELDS.amount]: "",
  [FIELDS.date]: Date.now(),
};
