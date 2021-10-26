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
    takeLatest(actionTypes.GET_ALL_ACCOUNT_TYPES, getAllAccountTypesSaga),
    takeLatest(actionTypes.GET_ALL_WAREHOUSE, getAllWarehouseSaga),
    takeLatest(actionTypes.GET_ALL_CUSTOMERS, getAllCustomersSaga),
    takeLatest(actionTypes.GET_ALL_SUPPLIERS, getAllSuppliersSaga),
    takeLatest(actionTypes.GET_ALL_PRODUCT_HEAD, getAllProductHeadSaga),
    takeLatest(actionTypes.GET_ALL_PRODUCT, getAllProductSaga),
  ]);
}

function* getAllEssentialsSaga() {
  try {
    yield put(actions.getAllCustomers());
    yield put(actions.getAllSuppliers());
    yield put(actions.getAllAccountTypes());
    yield put(actions.getAllWarehouse());
    yield put(actions.getAllProduct());
    yield put(actions.getAllProductHead());
    yield put(actions.getAllEssentialsSuccess());
  } catch (error) {}
}

function* getAllAccountTypesSaga() {
  try {
    const response = yield call(api.getAccountsApi);
    yield put(actions.getAllAccountTypesSuccess(response.data));
  } catch (error) {}
}

function* getAllWarehouseSaga() {
  try {
    const response = yield call(api.getWarehouseApi);
    yield put(actions.getAllWarehouseSuccess(response.data));
  } catch (error) {}
}

function* getAllCustomersSaga() {
  try {
    const response = yield call(api.getCustomersApi);
    yield put(actions.getAllCustomersSuccess(response.data));
  } catch (error) {}
}

function* getAllSuppliersSaga() {
  try {
    const response = yield call(api.getSuppliersApi);
    yield put(actions.getAllSuppliersSuccess(response.data));
  } catch (error) {}
}

function* getAllProductHeadSaga() {
  try {
    const response = yield call(api.getProductHeadApi);
    yield put(actions.getAllProductHeadSuccess(response.data));
  } catch (error) {}
}

function* getAllProductSaga() {
  try {
    const response = yield call(api.getProductApi);
    yield put(actions.getAllProductSuccess(response.data));
  } catch (error) {}
}

export default essentialSagas;
