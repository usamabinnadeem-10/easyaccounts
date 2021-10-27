import { all } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";

function* essentialSagas() {
  yield all([takeLatest(actionTypes.GET_ALL_ESSENTIALS, getAllEssentialsSaga)]);
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

    response = yield call(api.getProductHeadApi);
    yield put(actions.getAllProductHeadSuccess(response.data));

    response = yield call(api.getProductApi);
    yield put(actions.getAllProductSuccess(response.data));

    yield put(actions.getAllEssentialsSuccess());
  } catch (error) {
    yield put(actions.getAllEssentialsFail());
  }
}

export default essentialSagas;
