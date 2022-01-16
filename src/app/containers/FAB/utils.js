import {
  DEFAULTS,
  ADD_PRODUCT_FORM,
  ADD_CUSTOMER_FORM,
  ADD_WAREHOUSE_FORM,
  getExpenseForm,
  ADD_ACCOUNT_TYPE_FORM,
  ADD_EXPENSE_ACCOUNT_FORM,
} from "./constants";

export const chooseModal = (name, state) => {
  switch (name) {
    case DEFAULTS.ADD_CUSTOMER:
      return ADD_CUSTOMER_FORM;
    case DEFAULTS.ADD_EXPENSE_ACCOUNT:
      return ADD_EXPENSE_ACCOUNT_FORM;
    case DEFAULTS.ADD_PRODUCT:
      return ADD_PRODUCT_FORM;
    case DEFAULTS.ADD_WAREHOUSE:
      return ADD_WAREHOUSE_FORM;
    case DEFAULTS.ADD_EXPENSE:
      return getExpenseForm(state.expenseAccounts, state.accountTypes);
    case DEFAULTS.ADD_ACOUNT_TYPE:
      return ADD_ACCOUNT_TYPE_FORM;
    default:
      return [];
  }
};
