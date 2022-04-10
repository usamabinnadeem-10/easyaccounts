import * as actionTypes from './actionTypes';

// -----------------------------Formula Actions----------------------------- //

export const getAllFormulas = () => {
  return {
    type: actionTypes.GET_ALL_FORMULAS,
  };
};

export const getAllFormulasSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_FORMULAS_SUCCESS,
    payload: data,
  };
};

export const getAllFormulasFail = (error) => {
  return {
    type: actionTypes.GET_ALL_FORMULAS_FAIL,
    payload: error,
  };
};

export const addNewFormula = (data) => {
  return {
    type: actionTypes.ADD_NEW_FORMULA,
    payload: data,
  };
};

export const addNewFormulaSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_FORMULA_SUCCESS,
    payload: data,
  };
};

export const addNewFormulaFail = (error) => {
  return {
    type: actionTypes.ADD_NEW_FORMULA_FAIL,
    payload: error,
  };
};

// -----------------------------Product Actions----------------------------- //

export const getAllProduct = () => {
  return {
    type: actionTypes.GET_ALL_RAW_PRODUCT,
  };
};

export const getAllProductSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_RAW_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const getAllProductFail = (error) => {
  return {
    type: actionTypes.GET_ALL_RAW_PRODUCT_FAIL,
    payload: error,
  };
};

export const addNewRawProduct = (data) => {
  return {
    type: actionTypes.ADD_NEW_RAW_PRODUCT,
    payload: data,
  };
};

export const addNewProductSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_RAW_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const addNewProductFail = (data) => {
  return {
    type: actionTypes.ADD_NEW_RAW_PRODUCT_FAIL,
    payload: data,
  };
};
