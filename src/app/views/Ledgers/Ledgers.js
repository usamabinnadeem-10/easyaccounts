import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import LedgerDetail from "../../containers/LedgerDetail/LedgerDetail";

import { Grid } from "@mui/material";

import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { useStyles } from "./styles";
import { ERRORS } from "./constants";
import { SUCCESS } from "./constants";
import { LEDGER_URLS } from "../../../constants/restEndPoints";

import instance from "../../../utils/axiosApi";
import { makeQueryParamURL } from "../../utilities/stringUtils";
import { getURL } from "../../utilities/stringUtils";
import { makeDate } from "../../utilities/stringUtils";

function Ledgers() {
  const classes = useStyles();
  const history = useHistory();
  const state = useSelector((state) => state.essentials);

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ledgerData, setledgerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({});

  useEffect(() => {
    setCurrentPerson(null);
  }, [personType]);

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
    const URL = makeQueryParamURL(LEDGER_URLS.CREATE_LEDGER, params);

    instance
      .get(URL)
      .then((res) => {
        setledgerData(
          formatLedgerData(res.data.ledger_data, res.data.opening_balance)
        );
        setLoading(false);
        setStartDate(null);
        setEndDate(null);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

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

  // function that formats ledger data for table
  const formatLedgerData = (data, opening) => {
    let ledger = [];
    let balance = opening;
    data.forEach((element) => {
      let amount = element.amount;
      let nature = element.nature;
      if (nature === "D") {
        balance -= amount;
      } else {
        balance += amount;
      }
      ledger.push({
        ...element,
        credit: nature === "C" ? amount : "",
        debit: nature === "D" ? amount : "",
        balance: balance,
      });
    });
    return ledger;
  };

  const onRowClick = (id) => {
    console.log("row click :" + id);
  };

  const handleEdit = (id) => {
    history.push({
      pathname: "/home/ledger-transaction",
      state: ledgerData.filter((ledger) => ledger.id === id)[0],
    });
  };

  const handleDelete = (id) => {
    instance
      .delete(getURL(LEDGER_URLS.DELETE_LEDGER, "uuid", id))
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
      <Grid container className={classes.root} direction="column">
        <SearchAndSelect
          header="View Ledger"
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
      <div className={classes.table}>
        {ledgerData.length > 0 && (
          <LedgerDetail
            rows={ledgerData}
            onRowClick={onRowClick}
            hoverProperty={"transaction"}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default Ledgers;
