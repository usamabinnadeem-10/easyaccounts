import { FIELDS } from '../../containers/CustomFilters/constants';
import { timePeriodOptions } from './constants';
import { INVOICE_OPTIONS } from '../../../constants/choices';

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
  {
    qp: 'serial_type',
    type: FIELDS.SELECT,
    options: INVOICE_OPTIONS,
    placeholder: 'Transaction Type',
  },
];
