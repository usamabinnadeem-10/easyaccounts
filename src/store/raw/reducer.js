import * as actionTypes from './actionTypes';

import { formatFormulas } from './utils';

const initialState = {
  formulasInfo: {
    fetched: false,
    formulas: [],
  },
  productsInfo: {
    fetched: false,
    products: [],
  },
  isAdding: false,
  added: false,
  error: '',
  stock: {
    refetch: true,
    data: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ------------- Formula --------------- //
    case actionTypes.ADD_NEW_FORMULA:
      return {
        ...state,
        isAdding: true,
        added: false,
      };
    case actionTypes.ADD_NEW_FORMULA_SUCCESS:
      return {
        ...state,
        formulasInfo: {
          ...state.formulasInfo,
          formulas: [...state.formulasInfo.formulas, action.payload],
        },
        isAdding: false,
        added: true,
        error: '',
      };
    case actionTypes.ADD_NEW_FORMULA_FAIL:
      return {
        ...state,
        isAdding: false,
        added: false,
        error: action.payload,
      };
    case actionTypes.GET_ALL_FORMULAS_SUCCESS:
      return {
        ...state,
        formulasInfo: {
          formulas: formatFormulas(action.payload),
          fetched: true,
        },
      };
    // ------------- Product --------------- //
    case actionTypes.GET_ALL_RAW_PRODUCT_SUCCESS:
      return {
        ...state,
        productsInfo: {
          fetched: true,
          products: action.payload,
        },
        error: '',
      };
    case actionTypes.ADD_NEW_RAW_PRODUCT:
      return {
        ...state,
        isAdding: true,
        added: false,
      };
    case actionTypes.ADD_NEW_RAW_PRODUCT_SUCCESS:
      return {
        ...state,
        productsInfo: {
          ...state.productsInfo,
          products: [...state.productsInfo.products, action.payload],
        },
        isAdding: false,
        added: true,
        error: '',
      };
    case actionTypes.ADD_NEW_RAW_PRODUCT_FAIL:
      return {
        ...state,
        isAdding: false,
        added: false,
        error: action.payload,
      };
    case actionTypes.SET_RAW_STOCK:
      return {
        ...state,
        stock: {
          refetch: false,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
