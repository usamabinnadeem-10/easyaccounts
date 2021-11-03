import React from "react";
import { useState } from "react";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";

import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";

import { makeQueryParamURL } from "../../utilities/stringUtils";
import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { LEDGER_URLS } from "../../../constants/restEndPoints";
import { PERSONS, COLUMNS } from "./constants";

const Balances = () => {
  const classes = useStyles();

  const [snackbarState, setSnackbarState] = useState({});
  const [loading, setLoading] = useState(false);
  const [balancesData, setBalancesData] = useState([]);
  const [currentPerson, setCurrentPerson] = useState("C");

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
    let query = [
      {
        key: "person",
        value: currentPerson,
      },
    ];
    setLoading(true);
    instance
      .get(makeQueryParamURL(LEDGER_URLS.ALL_BALANCES, query))
      .then((res) => {
        setBalancesData(
          res.data.map((element, index) => {
            return {
              ...element,
              id: index,
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", "Oops, something went wrong");
      });
  };

  return (
    <>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      <div className={classes.root}>
        <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
          View All Balances
        </Typography>
        <div className={classes.selectPerson}>
          <CustomToggleButtons
            buttons={PERSONS}
            getSelectedValue={(value) => setCurrentPerson(value)}
            selectedValue={currentPerson}
          />
          <LoadingButton
            sx={{ fontWeight: 900 }}
            variant="contained"
            onClick={() => search()}
            loading={loading}
          >
            SEARCH
          </LoadingButton>
        </div>

        {balancesData.length > 0 && (
          <CustomTable data={balancesData} columns={COLUMNS} />
        )}
      </div>
      {loading && <CustomLoader pageLoader loading={loading} />}
    </>
  );
};

export default Balances;
