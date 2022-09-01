import { FIELDS } from '../../containers/CustomFilters/constants';

export const FILTERS = [
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
