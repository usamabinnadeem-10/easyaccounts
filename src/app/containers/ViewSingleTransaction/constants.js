import { DB, DB_TRANSLATION } from "../../../constants/db";

export const COLUMNS = [
  {
    accessor: DB.PRODUCT,
    Header: DB_TRANSLATION[DB.PRODUCT],
  },
  {
    accessor: DB.RATE,
    Header: DB_TRANSLATION[DB.RATE],
  },
  {
    accessor: DB.QUANTITY,
    Header: DB_TRANSLATION[DB.QUANTITY],
  },
  {
    accessor: DB.GAZAANA,
    Header: DB_TRANSLATION[DB.GAZAANA],
  },
  {
    accessor: DB.WAREHOUSE,
    Header: DB_TRANSLATION[DB.WAREHOUSE],
  },
  {
    accessor: DB.AMOUNT,
    Header: DB_TRANSLATION[DB.AMOUNT],
  },
];
