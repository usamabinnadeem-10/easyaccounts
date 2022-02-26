import React from "react";
import { useMemo } from "react";
import { useState } from "react";

import ChequeHistory from "../ChequeHistory";
import CustomTable from "../CustomTable";

import { getColumns } from "./constants";
import { getTableData } from "./utils";

const ChequeList = ({ cheques, isPersonal, persons, accounts }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [chequeId, setChequeId] = useState(null);

  const handleClick = (chequeId) => {
    setChequeId(chequeId);
    setShowDrawer(true);
  };
  const COLUMNS = useMemo(
    () => getColumns(handleClick, isPersonal),
    [isPersonal]
  );
  return (
    <>
      <CustomTable columns={COLUMNS} data={getTableData(cheques, persons)} />
      <ChequeHistory
        persons={persons}
        accounts={accounts}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        chequeId={chequeId}
        isExternal={!isPersonal}
      />
    </>
  );
};

export default ChequeList;
