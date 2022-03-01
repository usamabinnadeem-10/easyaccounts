import React from "react";

import CustomTable from "../CustomTable";

import { formatHistoryData } from "./utils";
import { COLUMNS } from "./constants";

const ChequeHistoryTable = ({ historyData, accounts }) => {
  return (
    <CustomTable
      columns={COLUMNS}
      data={formatHistoryData(historyData, accounts)}
    />
  );
};

export default ChequeHistoryTable;
