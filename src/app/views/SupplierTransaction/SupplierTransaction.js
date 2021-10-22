import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllSuppliers,
  getAllEssentials,
} from "../../../store/essentials/actions";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";

import * as constants from "./constants";

function SupplierTransaction() {
  let classes = useStyles();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.essentials);

  !state.downloadedSuppliers && dispatch(getAllSuppliers());
  !state.downloadedRest && dispatch(getAllEssentials());

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
        people={state.suppliers}
        metaConstants={constants.META_CONSTANTS}
        currentPerson={metaData.user}
        date={metaData.date}
        transactionType={metaData.transactionType}
        personIdentifier="Supplier"
        products={state.productHeads}
        colors={state.products}
      />
    </div>
  );
}

export default SupplierTransaction;
