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

export const PERSON_TYPES = [
  {
    name: "Customer",
    value: "customers",
    color: "info",
    accountTypes: true,
  },
  {
    name: "Supplier",
    value: "suppliers",
    color: "info",
  },
];

export const ERRORS = {
  NO_PERSON: "Please select a supplier or customer",
  NO_AMOUNT: "Please enter an amount",
};
