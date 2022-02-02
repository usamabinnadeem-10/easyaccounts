import * as actionTypes from "./actionTypes";

import { renameKeys } from "../../utils/objectUtils";

const initialState = {
  warehouses: [],
  accountTypes: [],
  customers: [],
  suppliers: [],
  products: [],
  expenseAccounts: [],
  fetched: false,
  added: false,
  adding: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ESSENTIALS_SUCCESS:
      return {
        ...state,
        fetched: true,
      };

    case actionTypes.GET_ALL_ESSENTIALS_FAIL:
      return {
        ...state,
        fetched: false,
      };

    case actionTypes.GET_ALL_ACCOUNT_TYPES_SUCCESS:
      const types = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        accountTypes: types,
      };

    case actionTypes.GET_ALL_CUSTOMERS_SUCCESS:
      const customers = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        customers: customers,
      };

    case actionTypes.GET_ALL_SUPPLIERS_SUCCESS:
      const suppliers = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        suppliers: suppliers,
      };

    case actionTypes.GET_ALL_PRODUCT_HEAD_SUCCESS:
      const heads = renameKeys(
        "id",
        "value",
        renameKeys("head_name", "label", action.payload)
      );
      return {
        ...state,
        productHeads: heads,
      };

    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      const products = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        products: products,
      };

    case actionTypes.GET_ALL_WAREHOUSE_SUCCESS:
      const warehouses = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        warehouses: warehouses,
      };

    case actionTypes.GET_ALL_EXPENSE_ACCOUNTS_SUCCESS:
      const expenses = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", action.payload)
      );
      return {
        ...state,
        expenseAccounts: expenses,
      };

    // actions to add new

    case actionTypes.ADD_NEW_EXPENSE_ACCOUNT:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_EXPENSE_ACCOUNT_SUCCESS:
      const newExpense = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", [action.payload])
      );
      return {
        ...state,
        expenseAccounts: [...state.expenseAccounts, ...newExpense],
        added: true,
        adding: false,
      };

    case actionTypes.ADD_NEW_WAREHOUSE:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_WAREHOUSE_SUCCESS:
      const newWarehouse = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", [action.payload])
      );
      return {
        ...state,
        warehouses: [...state.warehouses, ...newWarehouse],
        added: true,
        adding: false,
      };

    case actionTypes.ADD_NEW_PRODUCT_HEAD:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_PRODUCT_HEAD_SUCCESS:
      const newProductHead = renameKeys(
        "id",
        "value",
        renameKeys("head_name", "label", [action.payload])
      );
      return {
        ...state,
        productHeads: [...state.productHeads, ...newProductHead],
        added: true,
        adding: false,
      };

    case actionTypes.ADD_NEW_PERSON:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_PERSON_SUCCESS:
      let type = action.payload.person_type;
      let person = type === "C" ? "customers" : "suppliers";
      const newPerson = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", [action.payload])
      );
      return {
        ...state,
        [person]: [...state[person], ...newPerson],
        added: true,
        adding: false,
      };

    case actionTypes.ADD_NEW_ACCOUNT_TYPE:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_ACCOUNT_TYPE_SUCCESS:
      const newAccountType = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", [action.payload])
      );
      return {
        ...state,
        accountTypes: [...state.accountTypes, ...newAccountType],
        added: true,
        adding: false,
      };

    case actionTypes.ADD_NEW_PRODUCT:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_PRODUCT_SUCCESS:
      let newProductsRenamed = renameKeys(
        "id",
        "value",
        renameKeys("name", "label", [action.payload])
      );
      let newProducts = [...state.products, ...newProductsRenamed];
      return {
        ...state,
        products: newProducts,
        added: true,
        adding: false,
      };

    case actionTypes.RESET_ADDED:
      return {
        ...state,
        added: false,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_EXPENSE_DETAIL:
      return {
        ...state,
        adding: false,
      };

    case actionTypes.ADD_EXPENSE_DETAIL_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
        error: '',
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        added: false,
        adding: false,
        error: action.payload,
      }

    default:
      return state;
  }
};

export default reducer;
