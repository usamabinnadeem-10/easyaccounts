import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";

import { Grid } from "@mui/material";

import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { useStyles } from "./styles";

import instance from "../../../utils/axiosApi";
import { makeQueryParamURL } from "../../utilities/stringUtils";
import { getURL } from "../../utilities/stringUtils";
import { makeDate } from "../../utilities/stringUtils";

function ViewTransactions() {
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);

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
      openSnackbar(true, "error", "ERRORS.SELECT_PERSON" + personType);
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
        openSnackbar(true, "error", "ERRORS.OOPS");
      });
  };

  return (
    <Grid container className={classes.root} direction="column">
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
    </Grid>
  );
}

export default ViewTransactions;
