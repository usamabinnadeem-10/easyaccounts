import * as actionTypes from './actionTypes';

import { renameKeys } from '../../utils/objectUtils';

const initialState = {
  warehouses: [],
  accountTypes: [],
  customers: [],
  suppliers: [],
  equities: [],
  advanceExpenses: [],
  products: [],
  productCategories: [],
  expenseAccounts: [],
  areas: [],
  cities: [],
  fetched: false,
  added: false,
  adding: false,
  error: '',
  breakpoint: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ESSENTIALS_FETCHED_FALSE:
      return {
        ...state,
        fetched: false,
      };
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
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        accountTypes: types,
      };

    case actionTypes.GET_ALL_CUSTOMERS_SUCCESS:
      const customers = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        customers: customers.map((c) => ({
          ...c,
          label: `${c.label}${c.address ? ` (${c.address})` : ''}`,
        })),
      };

    case actionTypes.GET_ALL_SUPPLIERS_SUCCESS:
      const suppliers = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        suppliers: suppliers.map((c) => ({
          ...c,
          label: `${c.label}${c.address ? ` (${c.address})` : ''}`,
        })),
      };

    case actionTypes.GET_ALL_EQUITY_SUCCESS:
      const equities = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        equities: equities,
      };

    case actionTypes.GET_ALL_ADVANCE_EXPENSES_SUCCESS:
      const advanceExpenses = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        advanceExpenses: advanceExpenses,
      };

    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      const products = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        products: products,
      };

    case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
      const categories = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        productCategories: categories,
      };

    case actionTypes.GET_ALL_WAREHOUSE_SUCCESS:
      const warehouses = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        warehouses: warehouses,
      };

    case actionTypes.GET_ALL_EXPENSE_ACCOUNTS_SUCCESS:
      const expenses = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        expenseAccounts: expenses,
      };

    case actionTypes.GET_ALL_AREAS_SUCCESS:
      const areas = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        areas: areas,
      };

    case actionTypes.GET_ALL_CITIES_SUCCESS:
      const cities = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', action.payload)
      );
      return {
        ...state,
        cities: cities,
      };

    // actions to add new

    case actionTypes.ADD_NEW_EXPENSE_ACCOUNT:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_EXPENSE_ACCOUNT_SUCCESS:
      const newExpense = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      return {
        ...state,
        expenseAccounts: [...state.expenseAccounts, ...newExpense],
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_WAREHOUSE:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_WAREHOUSE_SUCCESS:
      const newWarehouse = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      return {
        ...state,
        warehouses: [...state.warehouses, ...newWarehouse],
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_PERSON:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_PERSON_SUCCESS:
      let type = action.payload.person_type;
      let person = type === 'C' ? 'customers' : 'suppliers';
      const newPerson = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      return {
        ...state,
        [person]: [...state[person], ...newPerson],
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_ACCOUNT_TYPE:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_ACCOUNT_TYPE_SUCCESS:
      const newAccountType = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      return {
        ...state,
        accountTypes: [...state.accountTypes, ...newAccountType],
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_PRODUCT:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_CATEGORY:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_NEW_CATEGORY_SUCCESS:
      let newCategoriesRenamed = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      let newCategories = [...state.productCategories, ...newCategoriesRenamed];
      return {
        ...state,
        productCategories: newCategories,
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_CATEGORY_FAIL:
      return {
        ...state,
        adding: false,
        error: action.payload,
      };

    case actionTypes.ADD_NEW_PRODUCT_SUCCESS:
      let newProductsRenamed = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      let newProducts = [...state.products, ...newProductsRenamed];
      return {
        ...state,
        products: newProducts,
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_NEW_AREA_SUCCESS:
      let newAreasRenamed = renameKeys(
        'id',
        'value',
        renameKeys('name', 'label', [action.payload])
      );
      let newAreas = [...state.areas, ...newAreasRenamed];
      return {
        ...state,
        areas: newAreas,
        added: true,
        adding: false,
        error: '',
      };

    case actionTypes.ADD_OPENING_STOCK:
      return {
        ...state,
        adding: true,
      };

    case actionTypes.ADD_OPENING_STOCK_SUCCESS:
      return {
        ...state,
        adding: false,
        added: true,
        error: '',
      };

    case actionTypes.ADD_OPENING_STOCK_FAIL:
      return {
        ...state,
        adding: false,
        error: action.payload,
      };

    // ---------------------------------------------------------------- //

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
      };
    case actionTypes.CANCEL_INVOICE:
      return {
        ...state,
        added: false,
        adding: true,
      };
    case actionTypes.CANCEL_INVOICE_SUCCESS:
      return {
        ...state,
        added: true,
        adding: false,
      };
    case actionTypes.RESET_STATE:
      return initialState;

    // ------------------------FAILURE------------------------- //
    case actionTypes.ADD_NEW_PRODUCT_FAIL:
      return {
        ...state,
        adding: false,
        added: false,
        error: action.payload,
      };

    case actionTypes.SET_BREAKPOINT:
      return {
        ...state,
        breakpoint: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
