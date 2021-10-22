import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";

import * as constants from "./constants";

import {
  getAllCustomers,
  getAllEssentials,
} from "../../../store/essentials/actions";

function CustomerTransaction() {
  let classes = useStyles();

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: "paid",
    accountType: null,
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state.essentials);

  useEffect(() => {
    !state.downloadedCustomers && dispatch(getAllCustomers());
    !state.downloadedRest && dispatch(getAllEssentials());
  }, []);

  const updateMetaData = (property, value) => {
    setMetaData({
      ...metaData,
      [property]: value,
    });
  };

  return (
    <div className={classes.root}>
      {state.downloadedCustomers && (
        <Transaction
          tableMeta={constants.TABLE_META}
          updateMetaData={updateMetaData}
          defaultRow={constants.DEFAULT_ROW}
          transactionTypes={constants.TRANSACTION_TYPES}
          metaConstants={constants.META_CONSTANTS}
          personIdentifier="Customer"
          showAccountTypes={metaData.transactionType === "paid"}
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
      )}
    </div>
  );
}

export default CustomerTransaction;
