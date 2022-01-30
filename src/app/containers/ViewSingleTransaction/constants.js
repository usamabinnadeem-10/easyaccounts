import { DB, DB_TRANSLATION } from "../../../constants/db";

export const getColumns = (gatePassView = false) => {
  return [
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
      hideInPrint: gatePassView ? false : true,
    },
    {
      accessor: DB.RATE,
      Header: DB_TRANSLATION[DB.RATE],
      hideInPrint: gatePassView ? true : false,
    },
    {
      accessor: DB.AMOUNT,
      Header: DB_TRANSLATION[DB.AMOUNT],
      hideInPrint: gatePassView ? true : false,
    },
  ];
};
