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
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Date (more than)',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'Date (less than)',
      variant: 'end',
    },
  ];
};
