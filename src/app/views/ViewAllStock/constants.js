import { formatCurrency } from '../../utilities/stringUtils';

export const getColumns = () => {
  return [
    {
      accessor: 'product',
      Header: 'Product',
      aggregate: 'sum',
    },
    {
      accessor: 'warehouse',
      Header: 'Warehouse',
    },
    {
      accessor: 'yards_per_piece',
      Header: 'Gazaana',
    },
    {
      accessor: 'quantity',
      Header: 'Stock',
      aggregate: 'sum',
      disableGroupBy: true,
      Cell: (row) => <div>{formatCurrency(row.value)}</div>,
      Footer: (info) => {
        // Only calculate total visits if rows change
        const total = info.rows.reduce(
          (sum, row) => row.values.quantity + sum,
          0,
        );
        return <>{formatCurrency(total)}</>;
      },
    },
    {
      accessor: 'total_gazaana',
      Header: 'Total Gazaana',
      aggregate: 'sum',
      disableGroupBy: true,
      Cell: (row) => <div>{formatCurrency(row.value)}</div>,
      Footer: (info) => {
        // Only calculate total visits if rows change
        const total = info.rows.reduce(
          (sum, row) => row.values.total_gazaana + sum,
          0,
        );
        return <>{formatCurrency(total)}</>;
      },
    },
  ];
};
