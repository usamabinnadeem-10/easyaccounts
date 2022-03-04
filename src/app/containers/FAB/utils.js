import { DEFAULTS, getExpenseForm, CANCEL_INVOICE_FORM } from "./constants";

export const chooseModal = (name, state) => {
  switch (name) {
    case DEFAULTS.ADD_EXPENSE:
      return getExpenseForm(state.expenseAccounts, state.accountTypes);
    case DEFAULTS.TRANSFER_ENTRY:
      return [];
    case DEFAULTS.CANCEL_INVOICE:
      return CANCEL_INVOICE_FORM;
    default:
      return [];
  }
};
