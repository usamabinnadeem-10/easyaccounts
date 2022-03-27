import * as actionTypes from "./actionTypes";

export const getAllDying = () => {
  return {
    type: actionTypes.GET_ALL_DYING,
  };
};

export const getAllDyingSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_DYING_SUCCESS,
    payload: data,
  };
};

export const getAllDyingFail = (error) => {
  return {
    type: actionTypes.GET_ALL_DYING_FAIL,
    payload: error,
  };
};

export const addNewDying = (data) => {
  return {
    type: actionTypes.ADD_NEW_DYING,
    payload: data,
  };
};

export const addNewDyingSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEW_DYING_SUCCESS,
    payload: data,
  };
};

export const addNewDyingFail = (error) => {
  return {
    type: actionTypes.ADD_NEW_DYING_FAIL,
    payload: error,
  };
};
