import { all } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as api from './api';

import { findErrorMessage } from '../../app/utilities/objectUtils';

const API_MAP = {
  CUSTOMERS: {
    api: api.getCustomersApi,
    action: actions.getAllCustomersSuccess,
  },
  SUPPLIERS: {
    api: api.getSuppliersApi,
    action: actions.getAllSuppliersSuccess,
  },
  EQUITIES: { api: api.getEquityApi, action: actions.getAllEquitySuccess },
  ADVANCE_EXPENSES: {
    api: api.getAdvanceExpensesApi,
    action: actions.getAllAdvanceExpensesSuccess,
  },
  AREAS: { api: api.getAreasApi, action: actions.getAllAreasSuccess },
  PRODUCT_CATEGORIES: {
    api: api.getCategoriesApi,
    action: actions.getAllCategoriesSuccess,
  },
  PRODUCTS: { api: api.getProductApi, action: actions.getAllProductSuccess },
  WAREHOUSES: {
    api: api.getWarehouseApi,
    action: actions.getAllWarehouseSuccess,
  },
  EXPENSE_ACCOUNTS: {
    api: api.getExpenseAccountsApi,
    action: actions.getAllExpenseAccountsSuccess,
  },
  ACCOUNT_TYPES: {
    api: api.getAccountsApi,
    action: actions.getAllAccountTypesSuccess,
  },
};

function* essentialSagas() {
  yield all([
    takeLatest(actionTypes.GET_ALL_ESSENTIALS, getEssentialsSaga),

    takeLatest(actionTypes.GET_ALL_CUSTOMERS, getEssentialsSaga, 'CUSTOMERS'),
    takeLatest(actionTypes.GET_ALL_SUPPLIERS, getEssentialsSaga, 'SUPPLIERS'),
    takeLatest(actionTypes.GET_ALL_EQUITY, getEssentialsSaga, 'EQUITIES'),
    takeLatest(
      actionTypes.GET_ALL_ADVANCE_EXPENSES,
      getEssentialsSaga,
      'ADVANCE_EXPENSES'
    ),

    takeLatest(actionTypes.GET_ALL_AREAS, getEssentialsSaga, 'AREAS'),

    takeLatest(
      actionTypes.GET_ALL_CATEGORIES,
      getEssentialsSaga,
      'PRODUCT_CATEGORIES'
    ),
    takeLatest(actionTypes.GET_ALL_PRODUCT, getEssentialsSaga, 'PRODUCTS'),
    takeLatest(actionTypes.GET_ALL_WAREHOUSE, getEssentialsSaga, 'WAREHOUSES'),

    takeLatest(
      actionTypes.GET_ALL_EXPENSE_ACCOUNTS,
      getEssentialsSaga,
      'EXPENSE_ACCOUNTS'
    ),
    takeLatest(
      actionTypes.GET_ALL_ACCOUNT_TYPES,
      getEssentialsSaga,
      'ACCOUNT_TYPES'
    ),

    takeLatest(actionTypes.ADD_NEW_ACCOUNT_TYPE, addNewAccountTypeSaga),
    takeLatest(actionTypes.ADD_NEW_PERSON, addNewPersonSaga),
    takeLatest(actionTypes.ADD_NEW_WAREHOUSE, addNewWarehouseSaga),
    takeLatest(actionTypes.ADD_NEW_EXPENSE_ACCOUNT, addNewExpenseAccountSaga),
    takeLatest(actionTypes.ADD_NEW_PRODUCT, addNewProductSaga),
    takeLatest(actionTypes.ADD_NEW_CATEGORY, addNewCategorySaga),
    takeLatest(actionTypes.ADD_NEW_AREA, addNewAreaSaga),
    takeLatest(actionTypes.ADD_OPENING_STOCK, addOpeningStockSaga),
    takeLatest(actionTypes.ADD_EXPENSE_DETAIL, addExpenseDetailSaga),
  ]);
}

// function* getEssentialsSaga(sagaType) {
//   try {
//     let role = localStorage.getItem('userRole');
//     let allowed = [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.ADMIN_VIEWER];
//     let allow = allowed.includes(role);

//     if (allow) {
//       let response = yield call(api.getAccountsApi);
//       yield put(actions.getAllAccountTypesSuccess(response.data));

//       response = yield call(api.getWarehouseApi);
//       yield put(actions.getAllWarehouseSuccess(response.data));

//       response = yield call(api.getCustomersApi);
//       yield put(actions.getAllCustomersSuccess(response.data));

//       response = yield call(api.getSuppliersApi);
//       yield put(actions.getAllSuppliersSuccess(response.data));

//       response = yield call(api.getEquityApi);
//       yield put(actions.getAllEquitySuccess(response.data));

//       response = yield call(api.getAdvanceExpensesApi);
//       yield put(actions.getAllAdvanceExpensesSuccess(response.data));

//       response = yield call(api.getProductApi);
//       yield put(actions.getAllProductSuccess(response.data));

//       response = yield call(api.getExpenseAccountsApi);
//       yield put(actions.getAllExpenseAccountsSuccess(response.data));

//       response = yield call(api.getAreasApi);
//       yield put(actions.getAllAreasSuccess(response.data));

//       response = yield call(api.getCategoriesApi);
//       yield put(actions.getAllCategoriesSuccess(response.data));
//     } else {
//       let response = yield call(api.getProductApi);
//       yield put(actions.getAllProductSuccess(response.data));

//       response = yield call(api.getWarehouseApi);
//       yield put(actions.getAllWarehouseSuccess(response.data));

//       response = yield call(api.getCategoriesApi);
//       yield put(actions.getAllCategoriesSuccess(response.data));
//     }

//     // response = yield call(api.getCitiesApi);
//     // yield put(actions.getAllCitiesSuccess(response.data));

//     yield put(actions.getAllEssentialsSuccess());
//   } catch (error) {
//     yield put(actions.getAllEssentialsFail());
//   }
// }

function* getEssentialsSaga(sagaType) {
  try {
    let response = yield call(API_MAP[sagaType].api);
    yield put(API_MAP[sagaType].action(response.data));
    yield put(actions.setEssentialsFetchError(''));
  } catch (error) {
    yield put(actions.setEssentialsFetchError(sagaType));
  }
}
// sagas to add new

function* addNewAccountTypeSaga(action) {
  let response = yield call(api.addAccountTypeApi, action.payload);
  yield put(actions.addNewAccountTypeSuccess(response.data));
}

function* addNewPersonSaga(action) {
  try {
    let response = yield call(api.addPersonApi, action.payload);
    yield put(actions.addNewPersonSuccess(response.data));
  } catch (error) {
    yield put(actions.setError(findErrorMessage(error.response.data)));
  }
}

function* addNewWarehouseSaga(action) {
  let response = yield call(api.addWarehouseApi, action.payload);
  yield put(actions.addNewWarehouseSuccess(response.data));
}

function* addNewExpenseAccountSaga(action) {
  let response = yield call(api.addExpenseAccountApi, action.payload);
  yield put(actions.addNewExpenseAccountSuccess(response.data));
}

function* addNewProductSaga(action) {
  try {
    let response = yield call(api.addProductApi, action.payload);
    yield put(actions.addNewProductSuccess(response.data));
  } catch (error) {
    yield put(actions.addNewProductFail(findErrorMessage(error.response.data)));
  }
}

function* addNewCategorySaga(action) {
  let response = yield call(api.addCategoryApi, action.payload);
  yield put(actions.addNewCategorySuccess(response.data));
}

function* addExpenseDetailSaga(action) {
  try {
    yield call(api.addExpenseDetailApi, action.payload);
    yield put(actions.addExpenseDetailSuccess());
  } catch (error) {
    yield put(actions.setError(findErrorMessage(error.response.data)));
  }
}

function* addNewAreaSaga(action) {
  let response = yield call(api.addAreaApi, action.payload);
  yield put(actions.addNewAreaSuccess(response.data));
}

function* addOpeningStockSaga(action) {
  try {
    let response = yield call(api.addOpeningStockApi, action.payload);
    yield put(actions.addOpeningStockSuccess(response.data));
  } catch (error) {
    yield put(
      actions.addOpeningStockFail(findErrorMessage(error.response.data))
    );
  }
}

export default essentialSagas;
