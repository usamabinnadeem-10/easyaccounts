import * as actionTypes from './actionTypes';

export const cacheLowStock = (data) => {
  return {
    type: actionTypes.CACHE_LOW_STOCK,
    payload: data,
  };
};
