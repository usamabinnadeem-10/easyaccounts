import { getReadableDate, formatCurrency } from '../../utilities/stringUtils';

export const COLUMNS = [
  {
    Header: 'Serial',
    accessor: 'serial',
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: (row) => <div>{row.value ? getReadableDate(row.value) : '---'}</div>,
  },
  {
    Header: 'Debit',
    accessor: 'debit',
    Cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
  {
    Header: 'Credit',
    accessor: 'credit',
    Cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
  {
    Header: 'Balance',
    accessor: 'balance',
    Cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
];
