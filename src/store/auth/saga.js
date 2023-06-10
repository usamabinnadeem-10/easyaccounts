import { all } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as api from './api';
import * as utils from './utils';

import { setEssentialsFetchedFalse } from '../essentials';
import { setHeaders } from '../../utils/axiosApi';
import { findErrorMessage } from '../../app/utilities/objectUtils';
import { isExpired } from 'react-jwt';

function* accountsSagas() {
  yield all([takeLatest(actionTypes.GET_TOKEN, getTokenSaga)]);
  yield all([takeLatest(actionTypes.GET_BRANCHES, getBranchesSaga)]);
  yield all([takeLatest(actionTypes.LOGIN, loginSaga)]);
  yield all([takeLatest(actionTypes.AUTO_LOGIN, autoLoginSaga)]);
  yield all([takeLatest(actionTypes.LOGOUT, logoutSaga)]);
}

function* getTokenSaga(action) {
  try {
    let response = yield call(api.getTokenApi, action.payload);
    yield call([localStorage, 'setItem'], 'access', response.data.access);
    yield call([localStorage, 'setItem'], 'refresh', response.data.refresh);
    setHeaders();
    yield put(actions.getTokenSuccess());
    yield put(actions.getBranches());
  } catch (error) {
    yield put(actions.getTokenFail(findErrorMessage(error.response.data)));
  }
}

function* getBranchesSaga(action) {
  try {
    let response = yield call(api.getBranchesApi);
    yield put(actions.getBranchesSuccess(response.data));
  } catch (error) {
    yield put(
      actions.getBranchesFail('You are not a part of any branch right now'),
    );
    utils.clearLocalStorage();
  }
}

function* loginSaga(action) {
  try {
    let response = yield call(api.loginApi, action.payload);
    utils.setActiveBranch(response.data);
    yield put(actions.loginSuccess(response.data));
  } catch (error) {
    utils.clearLocalStorage();
    yield put(actions.loginFail());
  }
}

function* autoLoginSaga(action) {
  try {
    let token = localStorage.getItem('refresh');
    let activeBranch = utils.getActiveBranch();
    let refreshTokenExpired = isExpired(token);
    if (!refreshTokenExpired && token) {
      setHeaders();
      yield put(actions.getTokenSuccess());
      if (activeBranch.branch_id) {
        yield put(actions.setActiveBranch(activeBranch));
        yield put(actions.setUserRole(activeBranch.role));
        yield put(actions.autoLoginComplete());
      } else {
        yield put(actions.getBranches());
      }
    } else {
      utils.clearLocalStorage();
      yield put(actions.loginFail());
    }
  } catch (error) {
    yield put(actions.loginFail());
  }
}

function* logoutSaga(action) {
  try {
    yield call(api.logoutApi);
    yield put(actions.logoutSuccess());
    yield put(setEssentialsFetchedFalse());
    utils.clearLocalStorage();
  } catch (error) {
    yield put(actions.logoutSuccess());
  }
}

export default accountsSagas;
