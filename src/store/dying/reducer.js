import * as actionTypes from "./actionTypes";

const initialState = {
  dyingUnits: [],
  isAdding: false,
  added: false,
  error: "",
  fetched: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_DYING:
      return {
        ...state,
        isAdding: true,
        added: false,
      };
    case actionTypes.ADD_NEW_DYING_SUCCESS:
      return {
        ...state,
        dyingUnits: [...state.dyingUnits, action.payload],
        isAdding: false,
        added: true,
        error: "",
      };
    case actionTypes.ADD_NEW_DYING_FAIL:
      return {
        ...state,
        isAdding: false,
        added: false,
        error: action.payload,
      };
    case actionTypes.GET_ALL_DYING_SUCCESS:
      return {
        ...state,
        dyingUnits: action.payload,
        fetched: true,
      };
    default:
      return state;
  }
};

export default reducer;
