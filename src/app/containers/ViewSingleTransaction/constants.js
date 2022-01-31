import { DB, DB_TRANSLATION } from "../../../constants/db";

const COLUMNS = [
  {
    accessor: DB.PRODUCT,
    Header: DB_TRANSLATION[DB.PRODUCT],
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
    accessor: "total_gazaana",
    Header: "Total Gazaana",
  },
  {
    accessor: DB.WAREHOUSE,
    Header: DB_TRANSLATION[DB.WAREHOUSE],
  },
  {
    accessor: DB.RATE,
    Header: DB_TRANSLATION[DB.RATE],
  },
  {
    accessor: DB.AMOUNT,
    Header: DB_TRANSLATION[DB.AMOUNT],
  },
];

export const getColumns = (gatePassView = false) => {
  if (gatePassView) {
    return COLUMNS.filter(
      (column) => column.accessor !== DB.RATE && column.accessor !== DB.AMOUNT
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
