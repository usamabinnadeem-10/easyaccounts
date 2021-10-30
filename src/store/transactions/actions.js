import * as actionTypes from "./actionTypes";

export const getSingleTransaction = (data) => {
  return {
    type: actionTypes.GET_SINGLE_TRANSACTION,
    payload: data,
  };
};

export const setFetchedFalse = () => {
  return {
    type: actionTypes.SET_FETCHED_FALSE,
  };
};

export const addTransactionToStore = (data) => {
  return {
    type: actionTypes.ADD_TRANSACTION_TO_STORE,
    payload: data,
  };
};
