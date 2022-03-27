import * as actionTypes from "./actionTypes";

import * as utils from "./utils";

const initialState = {
  formulasInfo: {
    fetched: false,
    formulas: [],
  },
  products: {},
  isAdding: false,
  added: false,
  error: "",
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
        error: "",
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
          formulas: action.payload,
          fetched: true,
        },
      };
    // ------------- Product --------------- //
    case actionTypes.GET_ALL_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.person]: [],
        },
      };
    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: utils.addListOfProductsToStore(
          state.products,
          action.payload
        ),
        error: "",
      };
    case actionTypes.ADD_NEW_PRODUCT:
      return {
        ...state,
        isAdding: true,
        added: false,
      };
    case actionTypes.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        products: utils.addProductToStore(state.products, action.payload),
        isAdding: false,
        added: true,
        error: "",
      };
    case actionTypes.ADD_NEW_PRODUCT_FAIL:
      return {
        ...state,
        isAdding: false,
        added: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
