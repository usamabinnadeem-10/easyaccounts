import { all } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as api from './api';
import * as utils from './utils';

import { findErrorMessage } from '../../app/utilities/objectUtils';

function* rawSagas() {
  yield all([
    takeLatest(actionTypes.GET_ALL_FORMULAS, getAllFormulaSaga),
    takeLatest(actionTypes.ADD_NEW_FORMULA, addNewFormulaSaga),
    takeLatest(actionTypes.GET_ALL_RAW_PRODUCT, getAllProductSaga),
    takeLatest(actionTypes.ADD_NEW_PRODUCT, addNewProductSaga),
  ]);
}

function* getAllFormulaSaga(action) {
  try {
    let response = yield call(api.listFormulaApi);
    yield put(actions.getAllFormulasSuccess(response.data));
  } catch (error) {
    yield put(actions.addNewFormulaFail(findErrorMessage(error.response.data)));
  }
}

function* addNewFormulaSaga(action) {
  try {
    let response = yield call(api.createFormulaApi, action.payload);
    yield put(actions.addNewFormulaSuccess(response.data));
  } catch (error) {
    yield put(actions.addNewFormulaFail(findErrorMessage(error.response.data)));
  }
}

function* getAllProductSaga(action) {
  try {
    let response = yield call(api.listRawProductApi);
    yield put(
      actions.getAllProductSuccess(utils.formatRawProducts(response.data))
    );
  } catch (error) {
    yield put(actions.getAllProductFail(findErrorMessage(error.response.data)));
  }
}

function* addNewProductSaga(action) {
  try {
    let response = yield call(api.createRawProduct, action.payload);
    yield put(
      actions.addNewProductSuccess(utils.formatRawProducts(response.data))
    );
  } catch (error) {
    yield put(actions.addNewProductFail(findErrorMessage(error.response.data)));
  }
}

export default rawSagas;
