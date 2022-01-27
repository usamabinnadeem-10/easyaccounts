import * as actionTypes from "./actionTypes";

const initialState = {
  transactions: [],
  fetched: false,
  allStock: {},
  shouldFetchStock: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SINGLE_TRANSACTION:
      return {
        ...state,
        fetched: false,
      };
    case actionTypes.SET_FETCHED_FALSE:
      return {
        ...state,
        fetched: false,
      };
    case actionTypes.ADD_TRANSACTION_TO_STORE:
      let transactionsNew = [...state.transactions];
      if (action.payload) {
        transactionsNew = [...transactionsNew, action.payload];
      }
      return {
        ...state,
        transactions: transactionsNew,
        fetched: true,
      };
    case actionTypes.GET_ALL_STOCK_SUCCESS:
      return {
        ...state,
        allStock: action.payload,
        shouldFetchStock: false,
        fetched: true,
      };
    case actionTypes.SET_SHOULD_FETCH:
      return {
        ...state,
        shouldFetchStock: action.payload,
        fetched: false,
      };
    default:
      return state;
  }
};

export default reducer;
