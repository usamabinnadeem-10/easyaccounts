import * as actionTypes from './actionTypes';

export const openModal = (modalId, data) => {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: {
      modalId,
      data,
    },
  };
};

export const closeModal = (modalId) => {
  return {
    type: actionTypes.CLOSE_MODAL,
    payload: modalId,
  };
};

export const closeAllModals = (modalId) => {
  return {
    type: actionTypes.CLOSE_ALL_MODALS,
    payload: modalId,
  };
};
