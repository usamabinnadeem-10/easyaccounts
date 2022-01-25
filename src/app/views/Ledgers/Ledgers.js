import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import { useReactToPrint } from "react-to-print";

import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

// import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import LedgerDetail from "../../components/LedgerDetail/LedgerDetail";
import TransactionDrawer from "../../components/TransactionDrawer/TransactionDrawer";
import Empty from "../../components/Empty/Empty";

import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { useStyles } from "./styles";
import { ERRORS } from "./constants";
import { SUCCESS } from "./constants";
import { formatLedgerData } from "./utils";
import { LEDGER_URLS } from "../../../constants/restEndPoints";

import { DB_TRANSLATION } from "../../../constants/db";
import instance from "../../../utils/axiosApi";
import { makeQueryParamURL, formatCurrency } from "../../utilities/stringUtils";
import { getURL } from "../../utilities/stringUtils";
import { makeDate } from "../../utilities/stringUtils";

function Ledgers({
  daybookView,
  defaultLedgers,
  warehouses,
  products,
  accounts,
  persons,
}) {
  const classes = useStyles();
  const history = useHistory();
  const state = useSelector((state) => state.essentials);
  const componentRef = useRef();

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ledgerData, setledgerData] = useState(
    daybookView ? formatLedgerData(defaultLedgers) : []
  );
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({});
  const [dialogueState, setDialogueState] = useState({
    open: false,
    dialogueValue: null,
    deleteItem: false,
    idToDelete: null,
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [transactionID, setTransactionID] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hideDetails, setHideDetails] = useState(false);

  useEffect(() => {
    setIsEmpty(false);
  }, [personType]);

  useEffect(() => {
    if (dialogueState.dialogueValue && dialogueState.deleteItem) {
      instance
        .delete(
          getURL(LEDGER_URLS.DELETE_LEDGER, "uuid", dialogueState.idToDelete)
        )
        .then((res) => {
          search();
          setDialogueState({
            ...dialogueState,
            open: false,
            dialogueValue: false,
            deleteItem: false,
            idToDelete: null,
          });
          openSnackbar(true, "success", SUCCESS.DELETED);
        })
        .catch((error) => {
          openSnackbar(true, "error", ERRORS.OOPS);
        });
    }
  }, [dialogueState]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const search = () => {
    if (!currentPerson) {
      openSnackbar(
        true,
        "error",
        ERRORS.SELECT_PERSON + DB_TRANSLATION[personType]
      );
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
        let ledgerDataFormatted = formatLedgerData(
          res.data.results,
          res.data.opening_balance
        );
        setledgerData(ledgerDataFormatted);
        setOpeningBalance(res.data.opening_balance);
        setClosingBalance(
          ledgerDataFormatted[ledgerDataFormatted.length - 1]?.formattedBalance
        );
        setIsEmpty(ledgerDataFormatted.length === 0);
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

  const onRowClick = (id) => {
    let transaction = ledgerData.filter((ledger) => ledger.id === id)[0]
      .transaction;
    transaction && setShowDrawer(true);
    setTransactionID(transaction);
  };

  const handleEdit = (id) => {
    history.push({
      pathname: "/home/ledger-transaction",
      state: ledgerData.filter((ledger) => ledger.id === id)[0],
    });
  };

  const handleDelete = (id) => {
    setDialogueState({
      ...dialogueState,
      open: true,
      deleteItem: true,
      idToDelete: id,
    });
  };

  const hideDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      <ConfirmationModal
        open={dialogueState.open}
        setDialogueState={(value) =>
          setDialogueState({ ...dialogueState, ...value })
        }
        closeDialogue={() =>
          setDialogueState({ ...dialogueState, open: false })
        }
      />
      {!daybookView && (
        <div className={classes.root}>
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
        </div>
      )}
      <div className={classes.ledgerWrapper} ref={componentRef}>
        {!daybookView && (
          <Grid container alignItems="center" justifyContent="space-between">
            <div>
              {currentPerson && (
                <Typography>
                  {`Ledger for `}
                  <Typography component="span" fontWeight={700}>
                    {currentPerson.label}
                  </Typography>
                </Typography>
              )}

              <Typography variant="body2">
                Opening Balance:{" "}
                {`${
                  Math.abs(openingBalance)
                    ? formatCurrency(openingBalance)
                    : "---"
                }${openingBalance < 0 ? " DB" : " CR"}`}
              </Typography>
              <Typography variant="body2">{`Closing Balance: ${closingBalance}`}</Typography>
              <Button
                variant="contained"
                onClick={() => setHideDetails(!hideDetails)}
                disabled={ledgerData.length === 0}
                sx={{ mt: 2, displayPrint: "none" }}
              >
                {hideDetails ? "SHOW DETAILS" : "HIDE DETAILS"}
              </Button>
            </div>
            <Button
              onClick={handlePrint}
              variant="contained"
              size="medium"
              color="secondary"
              disabled={ledgerData.length === 0}
              sx={{ displayPrint: "none" }}
            >
              PRINT
            </Button>
          </Grid>
        )}

        {/* <CustomDataGrid /> */}

        <div className={classes.table}>
          {ledgerData.length > 0 && (
            <LedgerDetail
              hideDetails={hideDetails}
              daybookView={daybookView}
              rows={ledgerData}
              onRowClick={onRowClick}
              hoverProperty={"transaction"}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
      {isEmpty && <Empty />}
      <TransactionDrawer
        hideDrawer={hideDrawer}
        open={showDrawer}
        transactionID={transactionID}
        warehouses={warehouses}
        products={products}
        accounts={accounts}
        persons={persons}
      />
    </>
  );
}

export default Ledgers;
