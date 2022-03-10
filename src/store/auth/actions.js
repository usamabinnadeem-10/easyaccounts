import * as actionTypes from "./actionTypes";

export const getToken = (data) => {
  return {
    type: actionTypes.GET_TOKEN,
    payload: data,
  };
};

export const getTokenSuccess = () => {
  return {
    type: actionTypes.GET_TOKEN_SUCCESS,
  };
};

export const getTokenFail = (data) => {
  return {
    type: actionTypes.GET_TOKEN_FAIL,
    payload: data,
  };
};

export const setActiveBranch = (data) => {
  return {
    type: actionTypes.SET_ACTIVE_BRANCH,
    payload: data,
  };
};

export const getBranches = () => {
  return {
    type: actionTypes.GET_BRANCHES,
  };
};

export const getBranchesSuccess = (data) => {
  return {
    type: actionTypes.GET_BRANCHES_SUCCESS,
    payload: data,
  };
};

export const getBranchesFail = (error) => {
  return {
    type: actionTypes.GET_BRANCHES_FAIL,
    payload: error,
  };
};

export const login = (data) => {
  return {
    type: actionTypes.LOGIN,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const autoLogin = () => {
  return {
    type: actionTypes.AUTO_LOGIN,
  };
};

export const refreshToken = () => {
  return {
    type: actionTypes.REFRESH_TOKEN,
  };
};
