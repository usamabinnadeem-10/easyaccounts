import React from "react";
import { useState } from "react";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";

import * as constants from "./constants";

function CustomerTransaction() {
  let classes = useStyles();

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: "cash",
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
        people={constants.CUSTOMERS}
        metaConstants={constants.META_CONSTANTS}
        currentPerson={metaData.user}
        date={metaData.date}
        transactionType={metaData.transactionType}
        personIdentifier="Customer"
        products={constants.PRODUCTS}
        colors={constants.COLORS}
      />
    </div>
  );
}

export default CustomerTransaction;
