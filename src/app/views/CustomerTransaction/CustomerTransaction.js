import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router';

import Transaction from '../../containers/NewTransaction';

import { useStyles } from './styles';
import * as constants from './constants';

function CustomerTransaction(props) {
  const classes = useStyles();
  const location = useLocation();

  const [metaData, setMetaData] = useState({
    user: null,
    date: null,
    transactionType: constants.TRANSACTION_TYPES[0].value,
    accountType: null,
    manualInvoiceSerial: null,
    requiresAction: false,
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
        accountType: location.state.account_type,
        manualInvoiceSerial: data.manual_invoice_serial,
        requiresAction: data.requires_action,
      });
      setTransactions(data.transaction_detail);
      setTransaction({ ...data, amount_paid: location.state.paid_amount });
    }
  }, []);

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
        {...props}
        prefixes={constants.PREFIXES}
        tableMeta={constants.TABLE_META}
        updateMetaData={updateMetaData}
        defaultRow={constants.DEFAULT_ROW}
        transactionTypes={constants.TRANSACTION_TYPES}
        metaConstants={constants.META_CONSTANTS}
        personIdentifier='Customer'
        showAccountTypes={metaData.transactionType === 'paid'}
        natures={constants.NATURES}
        options={{
          people: state.customers,
          accountTypes: state.accountTypes,
          warehouse: state.warehouses,
          product: state.products,
        }}
        selectedOptions={{
          currentPerson: metaData.user,
          currentAccountType: metaData.accountType,
          currentTransactionType: metaData.transactionType,
          currentDate: metaData.date,
          currentManualInvoiceSerial: metaData.manualInvoiceSerial,
          currentRequiresAction: metaData.requiresAction,
        }}
        transactionDetails={location.state ? transactions : null}
        transaction={transaction}
        warehouses={props.warehouses}
      />
    </div>
  );
}

export default CustomerTransaction;
