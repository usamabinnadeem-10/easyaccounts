import { formatCurrency } from '../../utilities/stringUtils';

export const getColumns = () => {
  return [
    {
      accessorKey: 'product',
      // header: 'Product',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} (items)`,
      header: ({ table }) => (
        <>
          <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
          >
            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
          </button>{' '}
          Product
        </>
      ),
    },
    {
      accessorKey: 'warehouse',
      // header: 'Warehouse',
      header: ({ table }) => (
        <>
          <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
          >
            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
          </button>{' '}
          Warehouse
        </>
      ),
    },
    {
      accessorKey: 'yards_per_piece',
      header: 'Gazaana',
    },
    {
      accessorKey: 'quantity',
      header: 'Stock',
      aggregate: 'sum',
      disableGroupBy: true,
      cell: ({ row }) => <div>{formatCurrency(row.original.value)}</div>,
      // footer: (info) => {
      //   console.log(info);
      //   // Only calculate total visits if rows change
      //   const total = info.rows.reduce(
      //     (sum, row) => row.values.quantity + sum,
      //     0,
      //   );
      //   return <>{formatCurrency(total)}</>;
      // },
    },
    {
      accessorKey: 'total_gazaana',
      header: 'Total Gazaana',
      aggregate: 'sum',
      disableGroupBy: true,
      cell: ({ row }) => <div>{formatCurrency(row.original.value)}</div>,
      // footer: (info) => {
      //   // Only calculate total visits if rows change
      //   const total = info.rows.reduce(
      //     (sum, row) => row.values.total_gazaana + sum,
      //     0,
      //   );
      //   return <>{formatCurrency(total)}</>;
      // },
    },
  ];
};
