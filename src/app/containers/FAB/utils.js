import {
  DEFAULTS,
  ADD_PRODUCT_FORM,
  ADD_CUSTOMER_FORM,
  ADD_WAREHOUSE_FORM,
  ADD_EXPENSE_FORM,
} from "./constants";

export const chooseModal = (name) => {
  switch (name) {
    case DEFAULTS.ADD_CUSTOMER:
      return ADD_CUSTOMER_FORM;
    case DEFAULTS.ADD_PRODUCT:
      return ADD_PRODUCT_FORM;
    case DEFAULTS.ADD_WAREHOUSE:
      return ADD_WAREHOUSE_FORM;
    case DEFAULTS.ADD_EXPENSE:
      return ADD_EXPENSE_FORM;
    default:
      return [];
  }
};
