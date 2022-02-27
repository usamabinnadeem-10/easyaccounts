import React from "react";
import { useMemo } from "react";
import { useState } from "react";

import ChequeHistory from "../ChequeHistory";
import CustomTable from "../CustomTable";
import CreateChequeHistory from "../../containers/CreateChequeHistory";

import { getColumns } from "./constants";
import { getTableData } from "./utils";

const ChequeList = ({ cheques, isPersonal, persons, accounts }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [chequeId, setChequeId] = useState(null);
  const [addHistoryState, setAddHistoryState] = useState({
    showModal: false,
    isChequeEntry: false,
    chequeId: "",
  });

  const handleClick = (chequeId) => {
    setChequeId(chequeId);
    setShowDrawer(true);
  };

  // add history other than cheque
  const handleAddHistory = (chequeId) => {
    setAddHistoryState({
      showModal: true,
      isChequeEntry: false,
      chequeId,
    });
  };

  // add cheque against cheque
  const handleAddChequeHistory = (chequeId) => {
    setAddHistoryState({
      showModal: true,
      isChequeEntry: true,
      chequeId,
    });
  };

  // transfer cheque of one party to another
  const handleTransferCheque = (chequeId) => {};

  // return external transferred cheque
  const handleReturnTransferredCheque = (chequeId) => {};

  // return external cheque to original party
  const handleReturnExternalCheque = (chequeId) => {};

  // reissue personal cheque to a party
  const handleReissueReturnedPersonalCheque = (chequeId) => {};

  // pass external cheque
  const handlePassExternalCheque = (chequeId) => {};

  // clear external transferred cheque
  const handlePassExternalTransferredCheque = (chequeId) => {};

  // pass personal cheque
  const handlePassPersonalCheque = (chequeId) => {};

  // return personal cheque from party
  const handleReturnPersonalCheque = (chequeId) => {};

  const externalChequeActions = useMemo(
    () => ({
      pending: [
        {
          action: handleTransferCheque,
          name: "Transfer cheque",
        },
        {
          action: handleAddHistory,
          name: "Add paid history",
        },
        {
          action: handleAddChequeHistory,
          name: "Add cheque history",
        },
        {
          action: handleReturnExternalCheque,
          name: "Return cheque to party",
        },
        {
          action: handlePassExternalCheque,
          name: "Clear party cheque",
        },
      ],
      transferred: [
        {
          action: handleReturnTransferredCheque,
          name: "Return transferred cheque",
        },
        {
          action: handlePassExternalTransferredCheque,
          name: "Clear transferred cheque",
        },
      ],
      cleared: [],
      returned: [],
    }),
    []
  );

  const personalChequeActions = useMemo(
    () => ({
      pending: [
        {
          action: handlePassPersonalCheque,
          name: "Clear personal cheque",
        },
        {
          action: handleReturnPersonalCheque,
          name: "Return personal cheque",
        },
      ],
      returned: [
        {
          action: handleReissueReturnedPersonalCheque,
          name: "Re-issue personal cheque",
        },
      ],
      cleared: [],
      cancelled: [],
    }),
    []
  );

  const COLUMNS = useMemo(
    () =>
      getColumns(
        handleClick,
        isPersonal,
        isPersonal ? personalChequeActions : externalChequeActions
      ),
    [isPersonal, externalChequeActions, personalChequeActions]
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
      <CreateChequeHistory
        chequeId={chequeId}
        isChequeEntry={addHistoryState.isChequeEntry}
        open={addHistoryState.showModal}
        onClose={() =>
          setAddHistoryState({
            showModal: false,
            chequeId: "",
          })
        }
      />
    </>
  );
};

export default ChequeList;
