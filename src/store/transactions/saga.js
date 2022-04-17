import { all } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as api from './api';

import { findErrorMessage } from '../../app/utilities/objectUtils';

function* transactionSagas() {
  yield all([
    takeLatest(actionTypes.GET_SINGLE_TRANSACTION, getSingleTransactionSaga),
    takeLatest(actionTypes.GET_ALL_STOCK, getAllStockSaga),
    takeLatest(actionTypes.CANCEL_STOCK_TRANSFER, cancelStockTransferSaga),
  ]);
}

function* getSingleTransactionSaga(action) {
  try {
    let response = yield call(api.getSingleTransactionApi, action.payload);
    yield put(actions.addTransactionToStore(response.data));
  } catch (error) {}
}

function* getAllStockSaga(action) {
  try {
    let response = yield call(api.getAllStock);
    yield put(actions.getAllStockSuccess(response.data));
  } catch (error) {}
}

function* cancelStockTransferSaga(action) {
  try {
    yield call(api.cancelStockTransferApi, action.payload);
    yield put(actions.cancelStockTransferSuccess());
  } catch (error) {
    yield put(
      actions.cancelStockTransferFail(findErrorMessage(error.response.data))
    );
  }
}

export default transactionSagas;
