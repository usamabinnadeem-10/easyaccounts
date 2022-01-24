import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useLocation } from "react-router";

import Transaction from "../../containers/Transaction/Transaction";

import { useStyles } from "./styles";

import * as constants from "./constants";

function SupplierTransaction() {
  const classes = useStyles();
  const location = useLocation();

  const state = useSelector((state) => state.essentials);

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
    manualInvoiceSerial: null,
  });

  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (location.state) {
      let data = location.state.transaction;
      setMetaData({
        user: data.person,
        date: data.date,
        transactionType: data.type,
        manualInvoiceSerial: data.manual_invoice_serial,
      });
      setTransactions(data.transaction_detail);
      setTransaction({ ...data, amount_paid: location.state.paid_amount });
    }
  }, []);

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
          product: state.products,
        }}
        selectedOptions={{
          currentPerson: metaData.user,
          currentTransactionType: metaData.transactionType,
          currentDate: metaData.date,
          currentManualInvoiceSerial: metaData.manualInvoiceSerial,
        }}
        transactionDetails={location.state ? transactions : null}
        transaction={transaction}
      />
    </div>
  );
}

export default SupplierTransaction;
