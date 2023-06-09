import { DB, DB_TRANSLATION } from '../../../../constants/db';

export const COLUMNS = [
  //   {
  //     accessor: DB.RAW_PRODUCT,
  //     Header: DB_TRANSLATION[DB.RAW_PRODUCT],
  //   },
  {
    accessor: DB.QUANTITY,
    Header: DB_TRANSLATION[DB.QUANTITY],
  },
  {
    accessor: DB.ACTUAL_GAZAANA,
    Header: DB_TRANSLATION[DB.ACTUAL_GAZAANA],
  },
  {
    accessor: DB.EXPECTED_GAZAANA,
    Header: DB_TRANSLATION[DB.EXPECTED_GAZAANA],
  },
  {
    accessor: DB.RATE_GAZAANA,
    Header: DB_TRANSLATION[DB.RATE_GAZAANA],
  },
  {
    accessor: 'total_actual_gazaana',
    Header: 'Gaz Total',
  },
  {
    accessor: 'total_expected_gazaana',
    Header: 'Physical Gaz Total',
  },
  {
    accessor: 'total_amount',
    Header: 'Total Amount',
  },
  //   {
  //     accessor: DB.WAREHOUSE,
  //     Header: DB_TRANSLATION[DB.WAREHOUSE],
  //   },
  //   {
  //     accessor: DB.RATE,
  //     Header: DB_TRANSLATION[DB.RATE],
  //   },
  //   {
  //     accessor: DB.AMOUNT,
  //     Header: DB_TRANSLATION[DB.AMOUNT],
  //   },
];
