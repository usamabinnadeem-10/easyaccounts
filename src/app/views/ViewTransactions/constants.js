export const SUCCESS = {
  DELETED: 'Transaction deleted successfully',
};

export const REDIRECTS = {
  INV: '/home/customer-transaction',
  MWC: '/home/customer-transaction',
  SUP: '/home/supplier-transaction',
  MWS: '/home/supplier-transaction',
};

export const DIALOGUE_INIT = {
  open: false,
  dialogueValue: null,
  deleteItem: false,
  idToDelete: null,
};

export const TRANSACTION_TYPES = [
  {
    label: 'Credit',
    value: 'credit',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Maal Wapsi',
    value: 'maal_wapsi',
  },
  {
    label: 'Purchase',
    value: 'purchase',
  },
];

export const TRANSACTION_STATUS_OPTIONS = [
  {
    label: 'Complete',
    value: false,
  },
  {
    label: 'Incomplete',
    value: true,
  },
];
