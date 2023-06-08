import * as actionTypes from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        [action.payload.modalId]: {
          open: true,
          ...action.payload.data,
        },
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: null,
      };
    case actionTypes.CLOSE_ALL_MODALS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
