import React from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Ledgers from "../Ledgers/Ledgers";
import ViewTransactions from "../ViewTransactions/ViewTransactions";
import ViewExpenses from "../ViewExpenses/ViewExpenses";
import AccountTypeCard from "../../components/AccountTypeCard/AccountTypeCard";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import { useStyles } from "./styles";

import { makeDate } from "../../utilities/stringUtils";
import moment from "moment";
import { getDaybook } from "../../../store/accounts/actions";

const Daybook = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const daybookData = useSelector((state) => state.accounts.daybook);
  const [date, setDate] = React.useState(null);
  const [displayDate, setDisplayDate] = React.useState(null);

  useEffect(() => {
    if (daybookData.shouldFetch) {
      dispatch(getDaybook());
    }
  }, [daybookData.shouldFetch]);

  useEffect(() => {
    if (date) {
      let currentDate = makeDate(date);
      dispatch(getDaybook(currentDate));
      setDisplayDate(moment(currentDate, "YYYY-MM-DD").format("Do MMMM YYYY"));
    } else {
      setDisplayDate(moment().format("Do MMMM YYYY"));
    }
  }, [date]);

  return (
    <div>
      {!daybookData.fetched ? (
        <CustomLoader pageLoader loading={!daybookData.fetched} />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography variant="h5" fontWeight={900}>
              Daybook for {displayDate}
            </Typography>
            <div>
              <Button
                variant="contained"
                size="small"
                sx={{ mr: 2 }}
                onClick={() => dispatch(getDaybook(date))}
              >
                REFRESH
              </Button>
              <CustomDatePicker
                fullWidth={false}
                placeholder="Date"
                getDate={(date) => setDate(date)}
                value={date}
              />
            </div>
          </div>

          <Typography variant="button" fontWeight={900} sx={{ mb: 2 }}>
            Account Balances
          </Typography>
          <div className={classes.accountTypesWrapper}>
            {Object.entries(daybookData.accounts).map(
              ([accountName, balance], index) => {
                return (
                  <AccountTypeCard
                    accountName={accountName}
                    balance={balance}
                    key={index}
                  />
                );
              }
            )}
          </div>

          {daybookData.transactions.length > 0 && (
            <>
              <Typography variant="button" fontWeight={900} sx={{ mb: 1 }}>
                Transactions
              </Typography>
              <ViewTransactions
                {...props}
                daybookView
                defaultTransactions={daybookData.transactions}
              />
            </>
          )}

          {daybookData.expenses.length > 0 && (
            <>
              <Typography
                variant="button"
                fontWeight={900}
                sx={{ mt: 1, mb: 3 }}
              >
                Expenses
              </Typography>
              <ViewExpenses
                {...props}
                daybookView
                defaultExpenses={daybookData.expenses}
              />
            </>
          )}

          {daybookData.ledgers.length > 0 && (
            <>
              <Typography
                variant="button"
                fontWeight={900}
                sx={{ mt: 3, mb: 1 }}
              >
                Ledgers
              </Typography>
              <Ledgers
                {...props}
                daybookView
                defaultLedgers={daybookData.ledgers}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Daybook;
