import { all } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";
import {
  formatTransactionData,
  isTransactionAvailable,
  formatAllStock,
} from "./utils";

function* transactionSagas() {
  yield all([
    takeLatest(actionTypes.GET_SINGLE_TRANSACTION, getSingleTransactionSaga),
    takeLatest(actionTypes.GET_ALL_STOCK, getAllStockSaga),
  ]);
}

function* getSingleTransactionSaga(action) {
  try {
    let data = action.payload;
    if (!isTransactionAvailable(data.transactions, data.id)) {
      let response = yield call(api.getSingleTransactionApi, data.id);
      // response = formatTransactionData(
      //   response.data.transaction,
      //   response.data.account_type,
      //   response.data.paid_amount,
      //   data.essentials
      // );
      yield put(actions.addTransactionToStore(response.data));
    } else {
      yield put(actions.addTransactionToStore());
    }
  } catch (error) {}
}

function* getAllStockSaga(action) {
  try {
    let response = yield call(api.getAllStock);
    yield put(actions.getAllStockSuccess(response.data));
  } catch (error) {}
}

export default transactionSagas;
