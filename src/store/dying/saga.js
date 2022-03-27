import { all } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";

import { findErrorMessage } from "../../app/utilities/objectUtils";

function* dyingSagas() {
  yield all([
    takeLatest(actionTypes.GET_ALL_DYING, getAllDyingSaga),
    takeLatest(actionTypes.ADD_NEW_DYING, addNewDyingSaga),
  ]);
}

function* getAllDyingSaga(action) {
  try {
    let response = yield call(api.getAllDyingApi);
    yield put(actions.getAllDyingSuccess(response.data));
  } catch (error) {
    yield put(actions.getAllDyingFail(findErrorMessage(error.response.data)));
  }
}

function* addNewDyingSaga(action) {
  try {
    let response = yield call(api.createDyingApi, action.payload);
    yield put(actions.addNewDyingSuccess(response.data));
  } catch (error) {
    yield put(actions.addNewDyingFail(findErrorMessage(error.response.data)));
  }
}

export default dyingSagas;
