export const COLUMNS = [
  {
    accessorKey: 'product__name',
    header: 'Product',
  },
  {
    accessorKey: 'yards_per_piece',
    header: 'Gazaana',
  },
  {
    accessorKey: 'quantity_sold',
    header: 'Thaan sold',
    cell: (row) => (
      <div>{row.value ? parseFloat(row.value).toFixed(2) : '---'}</div>
    ),
  },
  {
    accessorKey: 'average_rate',
    header: 'Avg rate',
    cell: (row) => (
      <div>{row.value ? parseFloat(row.value).toFixed(2) : '---'}</div>
    ),
  },
  {
    accessorKey: 'minimum_rate',
    header: 'Min rate',
    cell: (row) => (
      <div>{row.value ? parseFloat(row.value).toFixed(2) : '---'}</div>
    ),
  },
  {
    accessorKey: 'maximum_rate',
    header: 'Max rate',
    cell: (row) => (
      <div>{row.value ? parseFloat(row.value).toFixed(2) : '---'}</div>
    ),
  },
  {
    accessorKey: 'number_of_times_sold',
    header: 'Number of bills',
  },
];
