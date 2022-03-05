export const ACTION_TYPES = {
  PERSONAL: {
    PASS: "Pass personal cheque",
    RETURN: "Return personal cheque",
    RE_ISSUE: "Re-issue personal cheque",
    CANCEL: "Cancel personal cheque",
    DELETE: "Delete personal cheque",
  },
  EXTERNAL: {
    PASS: "Pass party cheque",
    RETURN: "Return party cheque",
    RETURN_TRANSFERRED: "Return party's transferred cheque",
    TRANSFER: "Transfer party cheque",
    DELETE: "Delete party cheque",
  },
};

export const FIELDS = {
  PERSON: "person",
  ACCOUNT_TYPE: "account_type",
};

const getDefault = (chequeId) => ({
  cheque: chequeId,
});

export const getInitialValues = (isPersonal, actionType, chequeId) => {
  if (isPersonal) {
    switch (actionType) {
      case ACTION_TYPES.PERSONAL.RETURN ||
        ACTION_TYPES.PERSONAL.PASS ||
        ACTION_TYPES.PERSONAL.CANCEL:
        return getDefault(chequeId);
      case ACTION_TYPES.PERSONAL.RE_ISSUE:
        return {
          ...getDefault(chequeId),
          person: "",
        };
      default:
        return getDefault(chequeId);
    }
  } else {
    switch (actionType) {
      case ACTION_TYPES.EXTERNAL.PASS:
        return {
          ...getDefault(chequeId),
          account_type: "",
        };
      case ACTION_TYPES.EXTERNAL.TRANSFER:
        return {
          ...getDefault(chequeId),
          person: "",
        };
      case ACTION_TYPES.EXTERNAL.RETURN ||
        ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED:
        return getDefault(chequeId);
      default:
        return getDefault(chequeId);
    }
  }
};
