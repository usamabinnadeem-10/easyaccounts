import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router';

import Transaction from '../../containers/NewTransaction';

import { useStyles } from './styles';

import * as constants from './constants';

function SupplierTransaction(props) {
  const classes = useStyles();
  const location = useLocation();

  const state = useSelector((state) => state.essentials);

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
    // manualInvoiceSerial: null,
    requiresAction: false,
  });

  const [transactions, setTransactions] = useState([]); // rows
  const [transaction, setTransaction] = useState(null); // complete transaction

  useEffect(() => {
    if (location.state) {
      let data = location.state.transaction;
      setMetaData({
        user: data.person,
        date: data.date,
        transactionType: data.type,
        manualInvoiceSerial: data.manual_invoice_serial,
        requiresAction: data.requires_action,
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
        {...props}
        prefixes={constants.PREFIXES}
        tableMeta={constants.TABLE_META}
        updateMetaData={updateMetaData}
        defaultRow={constants.DEFAULT_ROW}
        transactionTypes={constants.TRANSACTION_TYPES}
        metaConstants={constants.META_CONSTANTS}
        personIdentifier="Supplier"
        natures={constants.NATURES}
        options={{
          people: [...state.customers, ...state.suppliers],
          warehouse: state.warehouses,
          product: state.products,
        }}
        selectedOptions={{
          currentPerson: metaData.user,
          currentTransactionType: metaData.transactionType,
          currentDate: metaData.date,
          // currentManualInvoiceSerial: metaData.manualInvoiceSerial,
          currentRequiresAction: metaData.requiresAction,
        }}
        transactionDetails={location.state ? transactions : null}
        transaction={transaction}
        warehouses={props.warehouses}
      />
    </div>
  );
}

export default SupplierTransaction;
