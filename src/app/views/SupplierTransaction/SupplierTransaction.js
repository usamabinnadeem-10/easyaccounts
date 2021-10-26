import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";

import * as constants from "./constants";

function SupplierTransaction() {
  let classes = useStyles();

  const state = useSelector((state) => state.essentials);

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
  });

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
        personIdentifier="Supplier"
        natures={constants.NATURES}
        options={{
          people: state.suppliers,
          warehouse: state.warehouses,
          color: state.products,
          product: state.productHeads,
        }}
        selectedOptions={{
          currentPerson: metaData.user,
          currentTransactionType: metaData.transactionType,
          currentDate: metaData.date,
        }}
      />
    </div>
  );
}

export default SupplierTransaction;
