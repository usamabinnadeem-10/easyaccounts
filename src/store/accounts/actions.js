import * as actionTypes from "./actionTypes";

export const getDaybook = () => {
  return {
    type: actionTypes.GET_DAYBOOK,
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
