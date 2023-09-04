import { getReadableDate, formatCurrency } from '../../utilities/stringUtils';

export const COLUMNS = [
  {
    header: 'Serial',
    accessorKey: 'serial',
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (row) => <div>{row.value ? getReadableDate(row.value) : '---'}</div>,
  },
  {
    header: 'Debit',
    accessorKey: 'debit',
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
  {
    header: 'Credit',
    accessorKey: 'credit',
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
  {
    header: 'Balance',
    accessorKey: 'balance',
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
  },
];
