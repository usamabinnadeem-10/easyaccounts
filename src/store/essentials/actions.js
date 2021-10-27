import * as actionTypes from "./actionTypes";

export const getAllEssentials = () => {
  return {
    type: actionTypes.GET_ALL_ESSENTIALS,
  };
};

export const getAllEssentialsSuccess = () => {
  return {
    type: actionTypes.GET_ALL_ESSENTIALS_SUCCESS,
  };
};

export const getAllEssentialsFail = () => {
  return {
    type: actionTypes.GET_ALL_ESSENTIALS_FAIL,
  };
};

export const getAllAccountTypes = () => {
  return {
    type: actionTypes.GET_ALL_ACCOUNT_TYPES,
  };
};

export const getAllAccountTypesSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  };
};

export const getAllCustomers = () => {
  return {
    type: actionTypes.GET_ALL_CUSTOMERS,
  };
};

export const getAllCustomersSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_CUSTOMERS_SUCCESS,
    payload: data,
  };
};

export const getAllSuppliers = () => {
  return {
    type: actionTypes.GET_ALL_SUPPLIERS,
  };
};

export const getAllSuppliersSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_SUPPLIERS_SUCCESS,
    payload: data,
  };
};

export const getAllProductHead = () => {
  return {
    type: actionTypes.GET_ALL_PRODUCT_HEAD,
  };
};

export const getAllProductHeadSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_PRODUCT_HEAD_SUCCESS,
    payload: data,
  };
};

export const getAllProduct = () => {
  return {
    type: actionTypes.GET_ALL_PRODUCT,
  };
};

export const getAllProductSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const getAllWarehouse = () => {
  return {
    type: actionTypes.GET_ALL_WAREHOUSE,
  };
};

export const getAllWarehouseSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_WAREHOUSE_SUCCESS,
    payload: data,
  };
};
