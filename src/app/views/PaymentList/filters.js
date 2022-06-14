import { ROLES } from '../../../constants/roles';
import { FIELDS } from '../../containers/CustomFilters/constants';

export const getFilters = (essentials, role) => {
  return [
    {
      qp: 'person',
      options: [ROLES.ADMIN, ROLES.ACCOUNTANT].includes(role)
        ? [...essentials.suppliers, ...essentials.customers]
        : essentials.customers,
      type: FIELDS.SELECT,
      placeholder: 'Person',
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
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Date',
    },
    {
      qp: 'nature',
      options: [
        {
          label: 'Credit',
          value: 'C',
        },
        {
          label: 'Debit',
          value: 'D',
        },
      ],
      type: FIELDS.SELECT,
      placeholder: 'Nature',
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
      qp: 'account_type',
      options: essentials.accountTypes,
      type: FIELDS.SELECT,
      placeholder: 'Account',
    },
  ];
};
