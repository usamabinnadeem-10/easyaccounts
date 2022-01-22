import { all } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";

import { formatAccountsData } from "./utilities";

function* accountsSagas() {
  yield all([takeLatest(actionTypes.GET_DAYBOOK, getDaybookSaga)]);
}

function* getDaybookSaga(action) {
  try {
    let response = yield call(api.getDaybookApi, action.payload);
    let data = response.data;
    let formattedData = {
      transactions: data.transactions,
      ledgers: data.ledgers,
      expenses: data.expenses,
      accounts: formatAccountsData(data.balance_ledgers, data.balance_expenses),
    };
    yield put(actions.getDaybookSuccess(formattedData));
  } catch (error) {
    yield put(actions.getDaybookFail());
  }
}

export default accountsSagas;
