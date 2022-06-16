import { all } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as api from './api';

function* accountsSagas() {
  yield all([takeLatest(actionTypes.GET_DAYBOOK, getDaybookSaga)]);
}

function* getDaybookSaga(action) {
  try {
    let response = yield call(api.getDaybookApi, action.payload);
    let data = response.data;
    let formattedData = {
      transactions: data.transactions,
      payments: data.payments,
      expenses: data.expenses,
      accounts: data.balance_ledgers,
      externalCheques: data.external_cheques,
      externalChequesHistory: data.external_cheques_history,
      personalCheques: data.personal_cheques,
    };
    yield put(actions.getDaybookSuccess(formattedData));
  } catch (error) {
    yield put(actions.getDaybookFail());
  }
}

export default accountsSagas;
