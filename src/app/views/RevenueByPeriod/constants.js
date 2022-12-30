import { formatCurrency } from '../../utilities/stringUtils';
import { getTimePeriod } from '../../utilities/stringUtils';

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
    flex: 1,
    type: 'date',
    valueGetter: (params) =>
      getTimePeriod(params.row.period, params.row.periodKey),
  },
  {
    field: 'sale',
    headerName: 'Sale',
    flex: 1,
    type: 'number',
    cellRenderer: (row, value) => <div>{formatCurrency(value)}</div>,
  },
];
