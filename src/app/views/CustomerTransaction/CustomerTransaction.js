import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";
import * as constants from "./constants";

function CustomerTransaction() {
  let classes = useStyles();

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
    accountType: null,
  });

  const state = useSelector((state) => state.essentials);

  const updateMetaData = (property, value) => {
    setMetaData({
      ...metaData,
      [property]: value,
    });
  };

  return (
    <div className={classes.root}>
      <Transaction
        tableMeta={constants.TABLE_META}
        updateMetaData={updateMetaData}
        defaultRow={constants.DEFAULT_ROW}
        transactionTypes={constants.TRANSACTION_TYPES}
        metaConstants={constants.META_CONSTANTS}
        personIdentifier="Customer"
        showAccountTypes={metaData.transactionType === "paid"}
        natures={constants.NATURES}
        options={{
          people: state.customers,
          accountTypes: state.accountTypes,
          warehouse: state.warehouses,
          color: state.products,
          product: state.productHeads,
        }}
        selectedOptions={{
          currentPerson: metaData.user,
          currentAccountType: metaData.accountType,
          currentTransactionType: metaData.transactionType,
          currentDate: metaData.date,
        }}
      />
    </div>
  );
}

export default CustomerTransaction;
