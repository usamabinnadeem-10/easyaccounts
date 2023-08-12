import * as actionTypes from './actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DIALOG:
      return {
        ...state,
        [action.payload.dialogId]: {
          data: action.payload.dialogData,
          open: true,
        },
      };
    case actionTypes.CLOSE_DIALOG:
      return {
        ...state,
        [action.payload.dialogId]: null,
      };
    default:
      return state;
  }
};

export default reducer;
