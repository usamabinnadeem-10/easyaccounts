import { DB, DB_TRANSLATION } from '../../../constants/db';
import { formatCurrency } from '../../utilities/stringUtils';

const COLUMNS = [
  {
    accessorKey: DB.PRODUCT,
    header: DB_TRANSLATION[DB.PRODUCT],
  },
  {
    accessorKey: DB.QUANTITY,
    header: DB_TRANSLATION[DB.QUANTITY],
    aggregate: 'sum',
    disableGroupBy: true,
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
    footer: (info) => {
      // Only calculate total visits if rows change
      const total = info.rows.reduce(
        (sum, row) => row.values.quantity + sum,
        0,
      );
      return <>{formatCurrency(total)}</>;
    },
  },
  {
    accessorKey: DB.GAZAANA,
    header: DB_TRANSLATION[DB.GAZAANA],
  },
  {
    accessorKey: 'total_gazaana',
    header: 'Total Gazaana',
    aggregate: 'sum',
    disableGroupBy: true,
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
    footer: (info) => {
      // Only calculate total visits if rows change
      const total = info.rows.reduce(
        (sum, row) => row.values.total_gazaana + sum,
        0,
      );
      return <>{formatCurrency(total)}</>;
    },
  },
  {
    accessorKey: DB.WAREHOUSE,
    header: DB_TRANSLATION[DB.WAREHOUSE],
  },
  {
    accessorKey: DB.RATE,
    header: DB_TRANSLATION[DB.RATE],
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
    disableGroupBy: true,
  },
  {
    accessorKey: DB.AMOUNT,
    header: DB_TRANSLATION[DB.AMOUNT],
    aggregate: 'sum',
    cell: (row) => <div>{formatCurrency(row.value)}</div>,
    footer: (info) => {
      // Only calculate total visits if rows change
      const total = info.rows.reduce((sum, row) => row.values.amount + sum, 0);
      return <>{formatCurrency(total)}</>;
    },
  },
];

export const getColumns = (gatePassView = false) => {
  if (gatePassView) {
    return COLUMNS.filter(
      (column) =>
        column.accessorKey !== DB.RATE && column.accessorKey !== DB.AMOUNT,
    );
  } else {
    return COLUMNS.map((column) => {
      if (column.accessorKey === DB.WAREHOUSE) {
        return {
          ...column,
          hideInPrint: true,
        };
      }
      return { ...column };
    });
  }
};
