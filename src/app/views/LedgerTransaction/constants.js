export const TRANSACTION_TYPES = [
  {
    name: "Debit",
    value: "D",
    color: "error",
    accountTypes: true,
  },
  {
    name: "Credit",
    value: "C",
    color: "success",
  },
];

export const ERRORS = {
  NO_PERSON: "Please select ",
  NO_AMOUNT: "Please enter an amount",
  NO_ACCOUNT: "Please select an account type",
  OOPS: "Oops, something went wrong",
};

export const SUCCESS = {
  POST: "Ledger entry posted",
  EDIT: "Ledger entry edited",
};
