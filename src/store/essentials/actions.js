import * as actionTypes from './actionTypes';

export const setEssentialsFetchedFalse = () => {
  return {
    type: actionTypes.GET_ALL_ESSENTIALS,
  };
};

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

export const getAllExpenseAccounts = () => {
  return {
    type: actionTypes.GET_ALL_EXPENSE_ACCOUNTS,
  };
};

export const getAllExpenseAccountsSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_EXPENSE_ACCOUNTS_SUCCESS,
    payload: data,
  };
};

export const getAllAreas = () => {
  return {
    type: actionTypes.GET_ALL_AREAS,
  };
};

export const getAllAreasSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_AREAS_SUCCESS,
    payload: data,
  };
};

export const getAllCities = () => {
  return {
    type: actionTypes.GET_ALL_CITIES,
  };
};

export const getAllCitiesSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_CITIES_SUCCESS,
    payload: data,
  };
};

export const getAllCategories = () => {
  return {
    type: actionTypes.GET_ALL_CATEGORIES,
  };
};

export const getAllCategoriesSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
    payload: data,
  };
};

// ADD NEW ACTIONS

export const addNewPerson = (data) => {
  return {
    type: actionTypes.ADD_NEW_PERSON,
    payload: data,
  };
};

export const addNewProduct = (data) => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT,
    payload: data,
  };
};

export const addNewAccountType = (data) => {
  return {
    type: actionTypes.ADD_NEW_ACCOUNT_TYPE,
    payload: data,
  };
};

export const addNewWarehouse = (data) => {
  return {
    type: actionTypes.ADD_NEW_WAREHOUSE,
    payload: data,
  };
};

export const addNewExpenseAccount = (data) => {
  return {
    type: actionTypes.ADD_NEW_EXPENSE_ACCOUNT,
    payload: data,
  };
};

export const addNewArea = (data) => {
  return {
    type: actionTypes.ADD_NEW_AREA,
    payload: data,
  };
};

export const addNewCategory = (data) => {
  return {
    type: actionTypes.ADD_NEW_CATEGORY,
    payload: data,
  };
};

export const addOpeningStock = (data) => {
  return {
    type: actionTypes.ADD_OPENING_STOCK,
    payload: data,
  };
};

// ADD NEW SUCCESS ACTIONS

export const addNewPersonSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_PERSON_SUCCESS,
    payload: data,
  };
};

export const addNewProductSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const addNewAccountTypeSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_ACCOUNT_TYPE_SUCCESS,
    payload: data,
  };
};

export const addNewWarehouseSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_WAREHOUSE_SUCCESS,
    payload: data,
  };
};

export const addNewExpenseAccountSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_EXPENSE_ACCOUNT_SUCCESS,
    payload: data,
  };
};

export const addNewAreaSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_AREA_SUCCESS,
    payload: data,
  };
};

export const addNewCategorySuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const addOpeningStockSuccess = (data) => {
  return {
    type: actionTypes.ADD_OPENING_STOCK_SUCCESS,
    payload: data,
  };
};

export const addOpeningStockFail = (data) => {
  return {
    type: actionTypes.ADD_OPENING_STOCK_FAIL,
    payload: data,
  };
};

// ---------------------------------------------------------------- //

export const resetAdded = () => {
  return {
    type: actionTypes.RESET_ADDED,
  };
};

export const addExpenseDetail = (data) => {
  return {
    type: actionTypes.ADD_EXPENSE_DETAIL,
    payload: data,
  };
};

export const addExpenseDetailSuccess = () => {
  return {
    type: actionTypes.ADD_EXPENSE_DETAIL_SUCCESS,
  };
};

// action for showing error
export const setError = (data) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: data,
  };
};

export const cancelInvoice = (data) => {
  return {
    type: actionTypes.CANCEL_INVOICE,
    payload: data,
  };
};

export const cancelInvoiceSuccess = () => {
  return {
    type: actionTypes.CANCEL_INVOICE_SUCCESS,
  };
};

export const resetState = (data) => {
  return {
    type: actionTypes.RESET_STATE,
  };
};

// ----------------------FAIL ACTIONS----------------------- //
export const addNewProductFail = (data) => {
  return {
    type: actionTypes.ADD_NEW_PRODUCT_FAIL,
    payload: data,
  };
};
