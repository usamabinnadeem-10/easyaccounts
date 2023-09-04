import { DB, DB_TRANSLATION } from '../../../constants/db';
import { formatCurrency } from '../../utilities/stringUtils';

const COLUMNS = [
  {
    accessor: DB.PRODUCT,
    Header: DB_TRANSLATION[DB.PRODUCT],
  },
  {
    accessor: DB.QUANTITY,
    Header: DB_TRANSLATION[DB.QUANTITY],
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
    accessor: DB.GAZAANA,
    Header: DB_TRANSLATION[DB.GAZAANA],
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
  {
    accessor: DB.WAREHOUSE,
    Header: DB_TRANSLATION[DB.WAREHOUSE],
  },
  {
    accessor: DB.RATE,
    Header: DB_TRANSLATION[DB.RATE],
    Cell: (row) => <div>{formatCurrency(row.value)}</div>,
    disableGroupBy: true,
  },
  {
    accessor: DB.AMOUNT,
    Header: DB_TRANSLATION[DB.AMOUNT],
    aggregate: 'sum',
    Cell: (row) => <div>{formatCurrency(row.value)}</div>,
    Footer: (info) => {
      // Only calculate total visits if rows change
      const total = info.rows.reduce((sum, row) => row.values.amount + sum, 0);
      return <>{formatCurrency(total)}</>;
    },
  },
];

export const getColumns = (gatePassView = false) => {
  if (gatePassView) {
    return COLUMNS.filter(
      (column) => column.accessor !== DB.RATE && column.accessor !== DB.AMOUNT,
    );
  } else {
    return COLUMNS.map((column) => {
      if (column.accessor === DB.WAREHOUSE) {
        return {
          ...column,
          hideInPrint: true,
        };
      }
      return { ...column };
    });
  }
};
