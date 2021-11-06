import * as actionTypes from "./actionTypes";

const initialState = {
  daybook: {
    transactions: [],
    ledgers: [],
    expenses: [],
    accounts: [],
    fetched: false,
    error: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DAYBOOK_SUCCESS:
      return {
        ...state,
        daybook: {
          ...state.daybook,
          ...action.payload,
          fetched: true,
        },
      };
    case actionTypes.GET_DAYBOOK_FAIL:
      return {
        ...state,
        daybook: {
          ...state.daybook,
          fetched: false,
          error: true,
        },
      };
    case actionTypes.ADD_DATA_TO_DAYBOOK:
      return {
        ...state,
        daybook: {
          ...state.daybook,
          [action.data.account]: [
            action.data.data,
            ...state.daybook[action.data.account],
          ],
        },
      };
    default:
      return state;
  }
};

export default reducer;
