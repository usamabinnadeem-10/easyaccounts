export const ACTION_TYPES = {
  PERSONAL: {
    PASS: "PERSONAL_PASS",
    RETURN: "PERSONAL_RETURN",
    RE_ISSUE: "PERSONAL_RE_ISSUE",
    CANCEL: "PERSONAL_CANCEL",
  },
  EXTERNAL: {
    PASS: "EXTERNAL_PASS",
    RETURN: "EXTERNAL_RETURN",
    RETURN_TRANSFERRED: "EXTERNAL_RETURN_TRANSFERRED",
    TRANSFER: "EXTERNAL_TRANSFER",
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
      case ACTION_TYPES.PERSONAL.PASS || ACTION_TYPES.PERSONAL.CANCEL:
        return {};
      case ACTION_TYPES.PERSONAL.RETURN:
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
