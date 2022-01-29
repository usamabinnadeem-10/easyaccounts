import * as actionTypes from "./actionTypes";

export const getDaybook = (data) => {
  return {
    type: actionTypes.GET_DAYBOOK,
    payload: data,
  };
};

export const getDaybookSuccess = (data) => {
  return {
    type: actionTypes.GET_DAYBOOK_SUCCESS,
    payload: data,
  };
};

export const getDaybookFail = () => {
  return {
    type: actionTypes.GET_DAYBOOK_FAIL,
  };
};

export const addDataToDaybook = (data) => {
  return {
    type: actionTypes.ADD_DATA_TO_DAYBOOK,
    payload: data,
  };
};

export const setShouldFetchDaybook = (data) => {
  return {
    type: actionTypes.SET_SHOULD_FETCH_DAYBOOK,
    payload: data,
  }
}
