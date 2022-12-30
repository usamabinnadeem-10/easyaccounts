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
    flex: 1,
    type: 'number',
    renderCell: ({ row, value }) => {
      let val = value ? formatCurrency(value) : '';
      return <div>{val}</div>;
    },
  },
];
