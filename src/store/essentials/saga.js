import { all } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";

function* essentialSagas() {
  yield all([
    takeLatest(actionTypes.GET_ALL_ESSENTIALS, getAllEssentialsSaga),
    takeLatest(actionTypes.ADD_NEW_ACCOUNT_TYPE, addNewAccountTypeSaga),
    takeLatest(actionTypes.ADD_NEW_PERSON, addNewPersonSaga),
    takeLatest(actionTypes.ADD_NEW_WAREHOUSE, addNewWarehouseSaga),
    takeLatest(actionTypes.ADD_NEW_EXPENSE_ACCOUNT, addNewExpenseAccountSaga),
    takeLatest(actionTypes.ADD_NEW_PRODUCT, addNewProductSaga),
    takeLatest(actionTypes.ADD_NEW_AREA, addNewAreaSaga),
    takeLatest(actionTypes.ADD_EXPENSE_DETAIL, addExpenseDetailSaga),
    takeLatest(actionTypes.CANCEL_INVOICE, cancelInvoiceSaga),
  ]);
}

function* getAllEssentialsSaga() {
  try {
    let response = yield call(api.getAccountsApi);
    yield put(actions.getAllAccountTypesSuccess(response.data));

    response = yield call(api.getWarehouseApi);
    yield put(actions.getAllWarehouseSuccess(response.data));

    response = yield call(api.getCustomersApi);
    yield put(actions.getAllCustomersSuccess(response.data));

    response = yield call(api.getSuppliersApi);
    yield put(actions.getAllSuppliersSuccess(response.data));

    response = yield call(api.getProductApi);
    yield put(actions.getAllProductSuccess(response.data));

    response = yield call(api.getExpenseAccountsApi);
    yield put(actions.getAllExpenseAccountsSuccess(response.data));

    response = yield call(api.getAreasApi);
    yield put(actions.getAllAreasSuccess(response.data));

    yield put(actions.getAllEssentialsSuccess());
  } catch (error) {
    yield put(actions.getAllEssentialsFail());
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
    let errorObj = error.response.data;
    let key = Object.keys(errorObj)[0];
    yield put(actions.setError(errorObj[key][0]));
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
  let response = yield call(api.addProductApi, action.payload);
  yield put(actions.addNewProductSuccess(response.data));
}

function* addExpenseDetailSaga(action) {
  yield call(api.addExpenseDetailApi, action.payload);
  yield put(actions.addExpenseDetailSuccess());
}

function* addNewAreaSaga(action) {
  let response = yield call(api.addAreaApi, action.payload);
  yield put(actions.addNewAreaSuccess(response.data));
}

function* cancelInvoiceSaga(action) {
  try {
    yield call(api.cancelInvoiceApi, action.payload);
    yield put(actions.cancelInvoiceSuccess());
  } catch (error) {
    let errorObj = error.response.data;
    let key = Object.keys(errorObj)[0];
    yield put(actions.setError(errorObj[key]));
  }
}

export default essentialSagas;
