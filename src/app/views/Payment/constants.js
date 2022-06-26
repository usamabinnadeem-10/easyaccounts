import { getToday } from '../../utilities/stringUtils';

export const FIELDS = {
  person: 'person',
  account_type: 'account_type',
  date: 'date',
  amount: 'amount',
  nature: 'nature',
  detail: 'detail',
  images: 'images',
};

export const NATURES = [
  {
    label: 'Credit (جمع)',
    value: 'C',
  },
  {
    label: 'Debit (بنام)',
    value: 'D',
  },
];

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.account_type]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.amount]: '',
  [FIELDS.nature]: '',
  [FIELDS.detail]: '',
  [FIELDS.images]: [],
};
