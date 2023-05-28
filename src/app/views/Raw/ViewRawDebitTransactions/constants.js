import moment from 'moment';

export const COLUMNS = [
  {
    field: 'serial',
    headerName: 'Serial',
  },
  {
    field: 'person',
    headerName: 'Party',
    valueGetter: ({ row }) => row.person.label,
    width: 200,
  },
  {
    field: 'numLots',
    headerName: 'Total Lots',
    type: 'number',
  },
  {
    field: 'numThaans',
    headerName: 'Total Thaan',
    type: 'number',
  },
  {
    field: 'debit_type',
    headerName: 'Type',
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    valueGetter: ({ row }) => moment(row.date),
    renderCell: ({ row, value }) => <div>{value.format('DD-MM-YYYY')}</div>,
    width: 200,
  },
];
