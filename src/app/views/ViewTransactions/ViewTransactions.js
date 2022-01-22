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
import {formatTransactionData, formatTransactionDetails} from "./utils";


function ViewTransactions({ daybookView, defaultTransactions, accounts, persons, products, warehouses }) {
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);
  const history = useHistory();

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

  const handleEdit = (id) => {
    let transactionToEdit = transactionDataRaw.filter(
      (transaction) => transaction.id === id
    )[0];
    let account = accounts[transactionToEdit.account_type];
    let person = persons[transactionToEdit.person];
    history.push({
      pathname: REDIRECTS[person.person_type],
      state: {
        transaction: {
          ...transactionToEdit,
          person: person,
          date: getDateFromString(transactionToEdit.date),
          transaction_detail: formatTransactionDetails(
            transactionToEdit.transaction_detail,
            products,
            warehouses
          ),
        },
        account_type: account,
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
        warehouses={warehouses}
        products={products}
        accounts={accounts}
        persons={persons}
        />
    </>
  );
}

export default ViewTransactions;
