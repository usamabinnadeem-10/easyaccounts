import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { useReactToPrint } from "react-to-print";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import Empty from "../../components/Empty/Empty";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import { makeQueryParamURL } from "../../utilities/stringUtils";
import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { LEDGER_URLS } from "../../../constants/restEndPoints";
import { PERSONS, COLUMNS } from "./constants";
import { formatBalances } from "./utils";

const Balances = () => {
  const classes = useStyles();
  const componentRef = useRef();

  const [snackbarState, setSnackbarState] = useState({});
  const [loading, setLoading] = useState(false);
  const [balancesData, setBalancesData] = useState([]);
  const [currentPerson, setCurrentPerson] = useState("C");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(false);
  }, [currentPerson]);

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
        let formattedBalances = formatBalances(res.data);
        console.log(formattedBalances);
        setBalancesData(formattedBalances);
        setIsEmpty(formattedBalances.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", "Oops, something went wrong");
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      <div className={classes.root}>
        <div className={classes.headerWrapper}>
          <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
            View All Balances
          </Typography>
          <Button
            disabled={balancesData.length === 0}
            onClick={handlePrint}
            variant="contained"
            color="secondary"
          >
            PRINT
          </Button>
        </div>
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
        <div ref={componentRef}>
          {balancesData.length > 0 && (
            <CustomTable data={balancesData} columns={COLUMNS} />
          )}
        </div>
        {isEmpty && <Empty />}
      </div>
      {loading && <CustomLoader pageLoader loading={loading} />}
    </>
  );
};

export default Balances;
