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
    type: 'date',
    width: 200,
    valueGetter: (params) => {
      return params.row.totalRow
        ? params.value
        : getTimePeriod(params.row.period, params.row.periodKey);
    },
    sortable: false,
  },
  {
    field: 'sale',
    headerName: 'Sale',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    type: 'number',
    valueGetter: ({ value }) => {
      return value ? formatCurrency(value) : '';
    },
  },
];
