import * as actionTypes from './actionTypes';

export const setDialog = (dialogId, dialogData) => {
  return {
    type: actionTypes.SET_DIALOG,
    payload: {
      dialogId,
      dialogData,
    },
  };
};

export const closeDialog = (dialogId) => {
  return {
    type: actionTypes.CLOSE_DIALOG,
    payload: {
      dialogId,
    },
  };
};
