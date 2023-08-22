import { FIELDS } from '../../../containers/CustomFilters/constants';

export const getFilters = (essentials) => {
  return [
    {
      qp: 'person',
      options: [...essentials.suppliers, ...essentials.customers],
      type: FIELDS.SELECT,
      placeholder: 'Person',
    },
    {
      qp: 'manual_serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Manual Serial (from)',
    },
    {
      qp: 'manual_serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Manual Serial (to)',
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
