import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useLocation } from "react-router";

import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import SelectPerson from "../../components/SelectPerson/SelectPerson";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Select from "react-select";

import { useStyles } from "./styles";
import * as constants from "./constants";
import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { LEDGER_URLS } from "../../../constants/restEndPoints";
import instance from "../../../utils/axiosApi";
import {
  getDateFromString,
  makeDate,
  getURL,
} from "../../utilities/stringUtils";


function LedgerTransaction(props) {
  const classes = useStyles();
  const location = useLocation();

  const state = useSelector((state) => state.essentials);

  const [title, setTitle] = useState("New Ledger Entry");
  const [transactionType, setTransactionType] = useState(
    constants.TRANSACTION_TYPES[0].value
  );
  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [accountType, setAccountType] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [date, setDate] = useState(null);
  const [snackbarState, setSnackbarState] = useState({});
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (location.state) {
      let data = location.state;
      let person = props.persons[data.person];
      setTitle("Edit Ledger Entry");
      setCurrentPerson(person);
      setPersonType(person.person_type);
      setAccountType(props.accounts[data.account_type]);
      setAmount(data.amount);
      setTransactionType(data.nature);
      setDetail(data.detail);
      setDate(getDateFromString(data.date));
    }
  }, []);

  const LEDGER_FIELDS = [
    {
      placeholder: "Amount",
      type: "number",
      action: setAmount,
      value: amount,
    },
    {
      placeholder: "Detail",
      type: "text",
      action: setDetail,
      value: detail,
    },
  ];

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

  const resetState = () => {
    setDate(null);
    setAmount("");
    setDetail("");
  };

  const postLedger = () => {
    const balance = parseFloat(amount);
    if (!currentPerson) {
      openSnackbar(true, "error", constants.ERRORS.NO_PERSON + personType);
      return;
    }
    if (!balance) {
      openSnackbar(true, "error", constants.ERRORS.NO_AMOUNT);
      return;
    }

    if (
      transactionType === constants.TRANSACTION_TYPES[1].value &&
      !accountType
    ) {
      openSnackbar(true, "error", constants.ERRORS.NO_ACCOUNT);
      return;
    }
    setPosting(true);
    let data = {
      person: currentPerson.value,
      detail: detail,
      amount: balance,
      nature: transactionType,
      account_type: accountType?.value || null,
    };
    if (date) {
      data["date"] = makeDate(date);
    }
    if (!location.state) {
      instance
        .post(LEDGER_URLS.CREATE_LEDGER, data)
        .then((res) => {
          setPosting(false);
          resetState();
          openSnackbar(true, "success", constants.SUCCESS.POST);
        })
        .catch((error) => {
          setPosting(false);
          openSnackbar(true, "error", constants.ERRORS.OOPS);
        });
    } else {
      instance
        .put(getURL(LEDGER_URLS.UPDATE_LEDGER, "uuid", location.state.id), data)
        .then((res) => {
          setPosting(false);
          resetState();
          openSnackbar(true, "success", constants.SUCCESS.EDIT);
        })
        .catch((error) => {
          setPosting(false);
          openSnackbar(true, "error", constants.ERRORS.OOPS);
        });
    }
  };

  const handleSetAccountType = (account) => {
    account?.value === accountType?.value
      ? setAccountType(null)
      : setAccountType(account);
  };

  return (
    <>
      <Grid container direction="column" className={classes.root}>
        <Grid container justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="900">
            {title}
          </Typography>
          <CustomToggleButtons
            buttons={constants.TRANSACTION_TYPES}
            selectedValue={transactionType}
            getSelectedValue={(value) => setTransactionType(value)}
          />
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          className={`${classes.container}`}
        >
          <Select
            placeholder={"Account Type"}
            value={accountType}
            onChange={(account) => handleSetAccountType(account)}
            options={state.accountTypes}
          />
          <CustomDatePicker getDate={(date) => setDate(date)} value={date} />
        </Grid>

        <SelectPerson
          currentPerson={currentPerson}
          personType={personType}
          setCurrentPerson={setCurrentPerson}
          options={state[STORE_PERSON[personType]]}
          setPersonType={setPersonType}
        />

        <Grid container direction="column">
          {LEDGER_FIELDS.map((field, index) => {
            return (
              <TextField
                key={index}
                type={field.type}
                inputProps={{
                  min: 1,
                }}
                placeholder={field.placeholder}
                sx={{ mb: 2, width: 1 / 2.5 }}
                multiline={field.type === "text"}
                size="small"
                value={field.value}
                onChange={(e) => field.action(e.target.value || "")}
              />
            );
          })}
        </Grid>

        <LoadingButton
          loadingIndicator={<CustomLoader loading={posting} height={15} />}
          loading={posting}
          onClick={() => postLedger()}
          variant="contained"
          sx={{ mt: 3, mb: 2, fontWeight: 900 }}
        >
          {location.state ? "Edit" : "Post"}
        </LoadingButton>
      </Grid>

      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </>
  );
}

export default LedgerTransaction;
