import { FIELDS } from '../../containers/CustomFilters/constants';

import { BANKS } from '../../../constants/banks';
import { STATUS } from '../../../constants/chequeStatus';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'person',
      options: [...essentials.suppliers, ...essentials.customers],
      type: FIELDS.SELECT,
      placeholder: 'Person',
    },
    {
      qp: 'status',
      options: STATUS.PERSONAL,
      type: FIELDS.SELECT,
      placeholder: 'Status',
    },
    {
      qp: 'serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (more than)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (less than)',
    },
    {
      qp: 'amount__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Amount (more than)',
    },
    {
      qp: 'amount__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Amount (less than)',
    },
    {
      qp: 'cheque_number__contains',
      type: FIELDS.TEXT,
      placeholder: 'Cheque Number',
    },
    {
      qp: 'due_date__gte',
      type: FIELDS.DATE,
      placeholder: 'Start Due Date',
    },
    {
      qp: 'due_date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Due Date',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Issue Start Date',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'Issue End Date',
      variant: 'end',
    },
    {
      qp: 'bank',
      options: BANKS,
      type: FIELDS.SELECT,
      placeholder: 'Status',
    },
    {
      qp: 'account_type',
      options: essentials.accountTypes,
      type: FIELDS.SELECT,
      placeholder: 'Account',
    },
  ];
};
