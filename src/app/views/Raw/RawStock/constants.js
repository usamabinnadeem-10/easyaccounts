export const COLUMNS = [
  {
    field: 'raw_product',
    headerName: 'Product',
    width: 200,
    valueGetter: ({ row }) => row.raw_product.name,
  },
  {
    field: 'quantity',
    headerName: 'Thaan',
    type: 'number',
    width: 200,
  },
  {
    field: 'actual_gazaana',
    headerName: 'Gazaana',
    type: 'number',
    width: 200,
  },
  {
    field: 'expected_gazaana',
    headerName: 'Physical Gazaana',
    type: 'number',
    width: 200,
  },
  {
    field: 'warehouse',
    headerName: 'Warehouse',
    width: 150,
    valueGetter: ({ row }) => row.warehouse.label,
  },
  {
    field: 'lot_number',
    headerName: 'Lot #',
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
];
