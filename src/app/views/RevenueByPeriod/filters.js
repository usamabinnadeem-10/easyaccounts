import { FIELDS } from '../../containers/CustomFilters/constants';
import { timePeriodOptions } from './constants';

export const filters = [
  {
    qp: 'period',
    options: timePeriodOptions,
    type: FIELDS.SELECT,
    placeholder: 'Time period',
  },
  {
    qp: 'start',
    type: FIELDS.DATE,
    placeholder: 'Date (from)',
    variant: 'start',
  },
  {
    qp: 'end',
    type: FIELDS.DATE,
    placeholder: 'Date (to)',
    variant: 'end',
  },
];
