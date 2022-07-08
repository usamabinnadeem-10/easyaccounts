import { getToday } from '../../utilities/stringUtils';

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

export const FIELDS = {
  account_type: 'account_type',
  person: 'person',
  date: 'date',
  nature: 'nature',
  detail: 'detail',
  amount: 'amount',
};

export const INITIAL_VALUES = {
  [FIELDS.person]: '',
  [FIELDS.date]: getToday(),
  [FIELDS.account_type]: '',
  [FIELDS.nature]: '',
  [FIELDS.detail]: '',
  [FIELDS.amount]: '',
};
