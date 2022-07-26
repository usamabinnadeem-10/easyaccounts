export const ACTION_TYPES = {
  PERSONAL: {
    PASS: 'Clear personal cheque',
    RETURN: 'Return personal cheque',
    RE_ISSUE: 'Re-issue personal cheque',
    CANCEL: 'Cancel personal cheque',
    DELETE: 'Delete personal cheque',
  },
  EXTERNAL: {
    PASS: 'Clear party cheque',
    RETURN: 'Return party cheque',
    RETURN_TRANSFERRED: "Return party's transferred cheque",
    TRANSFER: 'Transfer party cheque',
    DELETE: 'Delete party cheque',
    COMPLETE_HISTORY: 'Complete history of party cheque',
    COMPLETE_TRANSFER: 'Clear party transferred cheque',
  },
};

// export const ACTION_TYPES = {
//   PERSONAL: {
//     PASS: 1,
//     RETURN: 2,
//     RE_ISSUE: 3,
//     CANCEL: 4,
//     DELETE: 5,
//   },
//   EXTERNAL: {
//     PASS: 6,
//     RETURN: 7,
//     RETURN_TRANSFERRED: 8,
//     TRANSFER: 9,
//     DELETE: 10,
//     COMPLETE_HISTORY: 11,
//     COMPLETE_TRANSFER: 12,
//   },
// };

export const FIELDS = {
  PERSON: 'person',
  ACCOUNT_TYPE: 'account_type',
  DATE: 'date',
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
          person: '',
        };
      default:
        return getDefault(chequeId);
    }
  } else {
    switch (actionType) {
      case ACTION_TYPES.EXTERNAL.PASS:
        return {
          ...getDefault(chequeId),
          account_type: '',
          date: '',
        };
      case ACTION_TYPES.EXTERNAL.TRANSFER:
        return {
          ...getDefault(chequeId),
          person: '',
          date: '',
        };
      case ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED ||
        ACTION_TYPES.EXTERNAL.RETURN:
        return { ...getDefault(chequeId), date: '' };
      default:
        return getDefault(chequeId);
    }
  }
};
