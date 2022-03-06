import instance from "../../../utils/axiosApi";

import { getURL } from "../../utilities/stringUtils";

import { CHEQUE_URLS } from "../../../constants/restEndPoints";

import { ACTION_TYPES } from "./constants";

// -------------------------------------------------------------- //

// PERSONAL CHEQUE APIS
export const passPersonalCheque = (data) => {
  let URL = getURL(CHEQUE_URLS.PERSONAL.PASS, "uuid", data.cheque);
  return instance.patch(URL);
};

export const cancelPersonalCheque = (data) => {
  let URL = getURL(CHEQUE_URLS.PERSONAL.CANCEL, "uuid", data.cheque);
  return instance.patch(URL);
};

export const returnPersonalCheque = (data) => {
  return instance.post(CHEQUE_URLS.PERSONAL.RETURN, data);
};

export const reissuePersonalCheque = (data) => {
  return instance.post(CHEQUE_URLS.PERSONAL.RE_ISSUE, data);
};

export const deletePersonalCheque = (data) => {
  let URL = getURL(CHEQUE_URLS.PERSONAL.DELETE, "uuid", data.cheque);
  return instance.delete(URL);
};

// -------------------------------------------------------------- //

// EXTERNAL CHEQUE APIS
export const passExternalCheque = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.PASS, data);
};

export const transferExternalCheque = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.TRANSFER, data);
};

export const returnExternalCheque = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.RETURN, data);
};

export const returnExternalTransferredCheque = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.RETURN_TRANSFER, data);
};

export const deleteExternalCheque = (data) => {
  let URL = getURL(CHEQUE_URLS.EXTERNAL.DELETE, "uuid", data.cheque);
  return instance.delete(URL);
};

export const completeHistoryExternalCheque = (data) => {
  return instance.post(CHEQUE_URLS.EXTERNAL.COMPLETE_HISTORY, data);
};

// -------------------------------------------------------------- //

export const API_MAPPING = {
  [ACTION_TYPES.PERSONAL.PASS]: passPersonalCheque,
  [ACTION_TYPES.PERSONAL.CANCEL]: cancelPersonalCheque,
  [ACTION_TYPES.PERSONAL.RETURN]: returnPersonalCheque,
  [ACTION_TYPES.PERSONAL.RE_ISSUE]: reissuePersonalCheque,
  [ACTION_TYPES.PERSONAL.DELETE]: deletePersonalCheque,
  // -------------------------------------------------------------- //
  [ACTION_TYPES.EXTERNAL.PASS]: passExternalCheque,
  [ACTION_TYPES.EXTERNAL.RETURN]: returnExternalCheque,
  [ACTION_TYPES.EXTERNAL.TRANSFER]: transferExternalCheque,
  [ACTION_TYPES.EXTERNAL.DELETE]: deleteExternalCheque,
  [ACTION_TYPES.EXTERNAL.COMPLETE_HISTORY]: completeHistoryExternalCheque,
};
