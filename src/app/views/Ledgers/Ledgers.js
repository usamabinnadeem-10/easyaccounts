import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import SelectPerson from "../../components/SelectPerson/SelectPerson";
import StartEndDate from "../../components/StartEndDate/StartEndDate";
import LedgerDetail from "../../containers/LedgerDetail/LedgerDetail";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { PERSON_TYPES } from "../../components/SelectPerson/constants";
import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { LEDGER_URLS } from "../../../constants/restEndPoints";
import { makeQueryParamURL } from "../../utilities/stringUtils";
import { makeDate } from "../../utilities/stringUtils";

function Ledgers() {
  const classes = useStyles();
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
      openSnackbar(true, "error", "Please select Customer / Supplier");
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
        openSnackbar(true, "error", "Oops, something went wrong");
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
        id: element.id,
        date: element.date,
        detail: element.detail,
        credit: nature === "C" ? amount : "",
        debit: nature === "D" ? amount : "",
        balance:
          balance < 0
            ? `${balance.toString().substring(1)} DB`
            : `${balance} CR`,
      });
    });
    return ledger;
  };

  return (
    <>
      <Grid container className={classes.root} direction="column">
        <Typography variant="h5" fontWeight="900" sx={{ mb: 4 }}>
          View Ledger
        </Typography>
        <SelectPerson
          currentPerson={currentPerson}
          personType={personType}
          setCurrentPerson={setCurrentPerson}
          options={state[personType]}
          setPersonType={setPersonType}
        />
        <Grid
          container
          justifyContent="space-between"
          className={classes.dateWrapper}
        >
          <StartEndDate
            startDate={startDate}
            endDate={endDate}
            getStartDate={setStartDate}
            getEndDate={setEndDate}
          />
          <LoadingButton
            loadingIndicator={<CustomLoader loading={loading} height={10} />}
            loading={loading}
            variant="contained"
            sx={{ fontWeight: 900 }}
            onClick={() => search()}
          >
            Search
          </LoadingButton>
        </Grid>
        <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      </Grid>
      <div className={classes.table}>
        {ledgerData.length > 0 && <LedgerDetail rows={ledgerData} />}
      </div>
    </>
  );
}

export default Ledgers;
