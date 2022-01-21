import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import TransactionDetail from "../../components/TransactionDetail/TransactionDetail";
import TransactionDrawer from "../../components/TransactionDrawer/TransactionDrawer";

import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { ERRORS, SUCCESS, REDIRECTS } from "./constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { useStyles } from "./styles";

import instance from "../../../utils/axiosApi";
import { makeQueryParamURL } from "../../utilities/stringUtils";
import { getURL } from "../../utilities/stringUtils";
import { makeDate, getDateFromString } from "../../utilities/stringUtils";
import {
  findPerson,
  findProduct,
  findWarehouse,
} from "../LedgerTransaction/utils";

function ViewTransactions({ daybookView, defaultTransactions }) {
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);
  const history = useHistory();

  // function that formats transaction data for table
  const formatTransactionData = (data) => {
    let transactions = [];
    data.forEach((element) => {
      let total = 0.0;
      element.transaction_detail.forEach((detail) => {
        total += detail.amount;
      });
      transactions.push({
        ...element,
        total: total,
      });
    });
    console.log(transactions);
    return transactions;
  };

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionData, setTransactionData] = useState(
    daybookView ? formatTransactionData(defaultTransactions) : []
  );
  const [transactionDataRaw, setTransactionDataRaw] = useState(
    daybookView ? defaultTransactions : []
  );
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({});

  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  // open snackbar
  const openSnackbar = (open, severity, message) => {
    setSnackbarState({
      open,
      severity,
      message,
    });
  };

  // close snackbar
  const closeSnackbar = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const search = () => {
    if (!currentPerson) {
      openSnackbar(true, "error", ERRORS.SELECT_PERSON + personType);
      return;
    }
    setLoading(true);
    const params = [
      {
        key: "person",
        value: currentPerson.value,
      },
      startDate && {
        key: "start",
        value: makeDate(startDate),
      },
      endDate && {
        key: "end",
        value: makeDate(endDate),
      },
    ];
    const URL = makeQueryParamURL(TRANSACTION_URLS.CREATE_TRANSACTION, params);

    instance
      .get(URL)
      .then((res) => {
        setTransactionData(formatTransactionData(res.data.results));
        setTransactionDataRaw(res.data.results);
        setLoading(false);
        setStartDate(null);
        setEndDate(null);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  const hideDrawer = () => {
    setShowDrawer(false);
  };

  const onRowClick = (id) => {
    let transaction = transactionDataRaw.filter(
      (element) => element.id === id
    )[0];
    setCurrentTransaction(transaction);
    setShowDrawer(true);
  };

  const formatTransactionDetails = (details) => {
    let transactions = [];
    details.forEach((element) => {
      let product = findProduct(
        element.product,
        state.products,
        state.productHeads
      );
      let warehouse = findWarehouse(element.warehouse, state.warehouses);
      transactions.push({
        product: product.product,
        color: product.color,
        warehouse: warehouse,
        quantity: element.quantity,
        rate: element.rate,
        total: element.amount,
        id: element.id,
      });
    });
    return transactions;
  };

  const handleEdit = (id) => {
    let transactionToEdit = transactionDataRaw.filter(
      (transaction) => transaction.transaction.id === id
    )[0];
    let transaction = transactionToEdit.transaction;
    let account = transactionToEdit.account_type;
    let person = findPerson(
      transaction.person,
      state.suppliers,
      state.customers
    );
    history.push({
      pathname: REDIRECTS[person.person_type],
      state: {
        transaction: {
          ...transaction,
          person: person,
          date: getDateFromString(transaction.date),
          transaction_detail: formatTransactionDetails(
            transaction.transaction_detail
          ),
        },
        account_type: account && {
          value: account.id,
          label: account.name,
        },
        paid_amount: transactionToEdit.paid_amount,
      },
    });
  };

  const handleDelete = (id) => {
    instance
      .delete(getURL(TRANSACTION_URLS.DELETE_TRANSACTION, "uuid", id))
      .then((res) => {
        search();
        openSnackbar(true, "success", SUCCESS.DELETED);
      })
      .catch((error) => {
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  return (
    <>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      {!daybookView && (
        <div className={classes.root}>
          <SearchAndSelect
            header="View Transactions"
            currentPerson={currentPerson}
            personType={personType}
            setCurrentPerson={setCurrentPerson}
            options={state[STORE_PERSON[personType]]}
            setPersonType={setPersonType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            loading={loading}
            search={search}
          />
        </div>
      )}
      <div className={classes.table}>
        {transactionData.length > 0 && (
          <TransactionDetail
            rows={transactionData}
            onRowClick={onRowClick}
            hoverProperty={"id"}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <TransactionDrawer
        dontFetch
        transactionData={currentTransaction}
        hideDrawer={hideDrawer}
        open={showDrawer}
      />
    </>
  );
}

export default ViewTransactions;
