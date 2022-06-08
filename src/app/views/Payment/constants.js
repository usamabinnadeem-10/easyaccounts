import { getToday } from '../../utilities/stringUtils';

export const FIELDS = {
  person: 'person',
  account_type: 'account_type',
  date: 'date',
  amount: 'amount',
  nature: 'nature',
  images: 'images',
};

export const NATURES = [
  {
    label: 'Credit',
    value: 'C',
  },
  {
    label: 'Debit',
    value: 'D',
  },
];

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.account_type]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.amount]: '',
  [FIELDS.nature]: '',
  [FIELDS.images]: [],
};
