export const COLUMNS = [
  {
    field: 'serial',
    headerName: 'Serial',
  },
  {
    field: 'person',
    headerName: 'Person',
    valueGetter: ({ row }) => row.person.label,
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
];
