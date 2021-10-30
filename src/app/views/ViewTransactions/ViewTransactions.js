import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import TransactionDetail from "../../components/TransactionDetail/TransactionDetail";

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

function ViewTransactions() {
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);
  const history = useHistory();

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({});

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

  // function that formats transaction data for table
  const formatLedgerData = (data) => {
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
    return transactions;
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
        setTransactionData(formatLedgerData(res.data));
        setLoading(false);
        setStartDate(null);
        setEndDate(null);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  const onRowClick = (id) => {
    history.push(`/home/transactions/${id}`);
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
    instance
      .get(getURL(TRANSACTION_URLS.GET_TRANSACTION, "uuid", id))
      .then((res) => {
        let transaction = res.data.transaction;
        let account = res.data.account_type;
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
            paid_amount: res.data.paid_amount,
          },
        });
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
        <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      </div>
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
    </>
  );
}

export default ViewTransactions;
