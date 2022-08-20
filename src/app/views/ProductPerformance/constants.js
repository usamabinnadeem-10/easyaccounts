export const COLUMNS = [
  {
    accessor: 'product__name',
    Header: 'Product',
  },
  {
    accessor: 'quantity_sold',
    Header: 'Thaan sold',
    Cell: (row) => <div>{parseFloat(row.value).toFixed(2)}</div>,
  },
  {
    accessor: 'average_rate',
    Header: 'Avg rate',
    Cell: (row) => <div>{parseFloat(row.value).toFixed(2)}</div>,
  },
  {
    accessor: 'minimum_rate',
    Header: 'Min rate',
    Cell: (row) => <div>{parseFloat(row.value).toFixed(2)}</div>,
  },
  {
    accessor: 'maximum_rate',
    Header: 'Max rate',
    Cell: (row) => <div>{parseFloat(row.value).toFixed(2)}</div>,
  },
  {
    accessor: 'number_of_times_sold',
    Header: 'Number of bills',
    Cell: (row) => <div>{parseFloat(row.value).toFixed(2)}</div>,
  },
];
