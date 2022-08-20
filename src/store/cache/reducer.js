import * as actionTypes from './actionTypes';

const initialState = {
  lowStockCache: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CACHE_LOW_STOCK:
      return {
        ...state,
        lowStockCache: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
