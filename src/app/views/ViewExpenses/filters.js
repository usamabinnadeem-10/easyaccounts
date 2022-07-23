import { FIELDS } from '../../containers/CustomFilters/constants';

import * as options from '../../../constants/choices';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'expense',
      type: FIELDS.SELECT,
      options: essentials.expenseAccounts,
      placeholder: 'Expense Head',
    },
    {
      qp: 'expense__type',
      type: FIELDS.SELECT,
      options: options.EXPENSE_TYPES,
      placeholder: 'Expense Category',
    },
    {
      qp: 'account_type',
      type: FIELDS.SELECT,
      options: essentials.accountTypes,
      placeholder: 'Account Type',
    },
    {
      qp: 'date',
      type: FIELDS.DATE,
      placeholder: 'Date',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Start Date',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Date',
      variant: 'end',
    },
    {
      qp: 'amount',
      type: FIELDS.NUMBER,
      placeholder: 'Amount # (equal to)',
    },
    {
      qp: 'amount__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Amount # (more than)',
    },
    {
      qp: 'amount__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Amount # (less than)',
    },
    {
      qp: 'serial',
      type: FIELDS.NUMBER,
      placeholder: 'Serial # (equal to)',
    },
    {
      qp: 'serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial # (more than)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial # (less than)',
    },
  ];
};
