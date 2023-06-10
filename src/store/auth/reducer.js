import * as actionTypes from './actionTypes';

const initialState = {
  isAuthenticated: false,
  hasToken: false,
  branches: [],
  loginFailed: false,
  error: null,
  activeBranch: null,
  userRole: null,
  loggingIn: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    case actionTypes.GET_TOKEN_SUCCESS:
      return {
        ...state,
        hasToken: true,
        error: null,
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
        error: null,
        isAuthenticated: true,
        activeBranch: action.payload,
      };
    case actionTypes.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    case actionTypes.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        error: null,
        branches: action.payload,
      };
    case actionTypes.GET_BRANCHES_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        hasToken: false,
        branches: [],
        error: action.payload,
      };
    case actionTypes.AUTO_LOGIN_COMPLETE:
      return {
        ...state,
        loggingIn: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        hasToken: true,
        activeBranch: action.payload,
        userRole: action.payload.role,
        error: null,
      };

    case actionTypes.LOGIN_FAIL:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
