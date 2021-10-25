import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Select from "react-select";

import { useStyles } from "./styles";

import * as constants from "./constants";

import {
  getAllCustomers,
  getAllEssentials,
  getAllSuppliers,
} from "../../../store/essentials/actions";

import { LEDGER_URLS } from "../../../constants/restEndPoints";

import instance from "../../../utils/axiosApi";

import { capitalizeFirstLetter } from "../../utilities/stringUtils";

function LedgerTransaction() {
  let classes = useStyles();

  const [transactionType, setTransactionType] = useState(
    constants.TRANSACTION_TYPES[0].value
  );
  const [personType, setPersonType] = useState(constants.PERSON_TYPES[0].value);
  const [accountType, setAccountType] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarState, setSnackbarState] = useState({});
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [posting, setPosting] = useState(false);

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

  const dispatch = useDispatch();
  const state = useSelector((state) => state.essentials);

  useEffect(() => {
    !state.downloadedCustomers && dispatch(getAllCustomers());
    !state.downloadedSuppliers && dispatch(getAllSuppliers());
    !state.downloadedRest && dispatch(getAllEssentials());
  }, []);

  useEffect(() => {
    state.downloadedCustomers &&
      state.downloadedSuppliers &&
      state.downloadedRest &&
      setLoading(false);
  }, [
    state.downloadedCustomers,
    state.downloadedSuppliers,
    state.downloadedRest,
  ]);

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

  const postLedger = () => {
    setPosting(true);
    const balance = parseFloat(amount);
    if (!currentPerson) {
      openSnackbar(true, "error", constants.ERRORS.NO_PERSON);
      return;
    }
    if (!balance) {
      openSnackbar(true, "error", constants.ERRORS.NO_AMOUNT);
      return;
    }

    let data = {
      person: currentPerson.value,
      detail: detail,
      amount: balance,
      nature: transactionType,
    };
    if (date) {
      data["date"] = `${date.year}-${date.month}-${date.day}`;
    }
    if (accountType) {
      data["account_type"] = accountType.value;
    }
    instance
      .post(LEDGER_URLS.CREATE_LEDGER, data)
      .then((res) => {
        setPosting(false);
        console.log(res.data);
      })
      .catch((error) => {
        setPosting(false);
      });
  };

  return (
    <>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <Grid container direction="column" className={classes.root}>
          <Grid container justifyContent="space-between" sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="900">
              New Ledger Entry
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
              onChange={(accout) => setAccountType(accout)}
              options={state.accountTypes}
            />
            <CustomDatePicker getDate={(date) => setDate(date)} value={date} />
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            className={classes.container}
          >
            <div className={classes.people}>
              <Select
                placeholder={capitalizeFirstLetter(personType)}
                value={currentPerson}
                onChange={(person) => setCurrentPerson(person)}
                options={state[personType]}
              />
            </div>
            <CustomToggleButtons
              buttons={constants.PERSON_TYPES}
              selectedValue={personType}
              getSelectedValue={(value) => setPersonType(value)}
            />
          </Grid>

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
            Post
          </LoadingButton>
        </Grid>
      )}
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
    </>
  );
}

export default LedgerTransaction;
