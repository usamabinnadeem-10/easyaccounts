import { formatCurrency } from '../../utilities/stringUtils';

export const timePeriodOptions = [
  {
    value: 'day',
    label: 'Daily',
  },
  {
    value: 'week',
    label: 'Weekly',
  },
  {
    value: 'month',
    label: 'Monthly',
  },
];

export const columns = [
  {
    field: 'period',
    headerName: 'Time Period',
    // width: 200,
    flex: 1,
    sortable: false,
  },
  {
    field: 'sale',
    headerName: 'Sale',
    // width: 200,
    flex: 1,
    type: 'number',
    cellRenderer: (row, value) => <div>{formatCurrency(value)}</div>,
  },
];
