import * as actionTypes from "./actionTypes";

const initialState = {
  isAuthenticated: false,
  hasToken: false,
  branches: [],
  loginFailed: false,
  error: "",
  activeBranch: null,
  token: localStorage.getItem("access"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    case actionTypes.GET_TOKEN_SUCCESS:
      return {
        ...state,
        hasToken: true,
      };
    case actionTypes.GET_TOKEN_FAIL:
      return {
        ...state,
        hasToken: false,
        loginFailed: true,
        error: action.payload,
      };
    case actionTypes.SET_ACTIVE_BRANCH:
      return {
        ...state,
        isAuthenticated: true,
        activeBranch: action.payload,
      };
    case actionTypes.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: action.payload,
      };
    case actionTypes.GET_BRANCHES_FAIL:
      return {
        isAuthenticated: false,
        hasToken: false,
        branches: [],
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        hasToken: true,
        activeBranch: action.payload,
      };

    case actionTypes.LOGIN_FAIL:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
