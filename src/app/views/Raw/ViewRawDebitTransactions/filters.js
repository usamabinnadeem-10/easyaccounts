import { FIELDS } from '../../../containers/CustomFilters/constants';

const debitTypeOptions = [
  {
    label: 'Sale',
    value: 'Sale',
  },
  {
    label: 'Return',
    value: 'Return',
  },
  {
    label: 'Transfer',
    value: 'Transfer',
  },
];

export const getFilters = (essentials) => {
  return [
    {
      qp: 'person',
      options: [...essentials.suppliers, ...essentials.customers],
      type: FIELDS.SELECT,
      placeholder: 'Party',
    },
    {
      qp: 'lots__lot_number',
      type: FIELDS.NUMBER,
      placeholder: 'Lot # (equal to)',
    },
    {
      qp: 'lots__lot_number__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Lot # (from)',
    },
    {
      qp: 'lots__lot_number__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Lot # (to)',
    },
    {
      qp: 'debit_type',
      type: FIELDS.SELECT,
      placeholder: 'Type',
      options: debitTypeOptions,
    },
    {
      qp: 'serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (from)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (to)',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Date (from)',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'Date (to)',
      variant: 'end',
    },
  ];
};
