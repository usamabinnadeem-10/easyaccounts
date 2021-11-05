import React from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Ledgers from "../Ledgers/Ledgers";
import ViewTransactions from "../ViewTransactions/ViewTransactions";
import ViewExpenses from "../ViewExpenses/ViewExpenses";
import AccountTypeCard from "../../components/AccountTypeCard/AccountTypeCard";

import { Typography } from "@mui/material";

import { useStyles } from "./styles";

import moment from "moment";
import { getDaybook } from "../../../store/accounts/actions";

const Daybook = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const daybookData = useSelector((state) => state.accounts.daybook);

  useEffect(() => {
    if (!daybookData.fetched) {
      dispatch(getDaybook());
    }
  }, [daybookData.fetched]);

  return (
    <div>
      {!daybookData.fetched ? (
        <CustomLoader pageLoader loading={!daybookData.fetched} />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography variant="h5" fontWeight={900}>
              Daybook for {moment().format("Do MMMM YYYY")}
            </Typography>
          </div>

          <Typography variant="button" fontWeight={900} sx={{ mb: 2 }}>
            Account Balances
          </Typography>
          <div className={classes.accountTypesWrapper}>
            {daybookData.accounts.map((account, index) => {
              return <AccountTypeCard account={account} key={index} />;
            })}
          </div>

          <Typography variant="button" fontWeight={900} sx={{ mb: 1 }}>
            Transactions
          </Typography>
          <ViewTransactions
            daybookView
            defaultTransactions={daybookData.transactions}
          />

          <Typography variant="button" fontWeight={900} sx={{ mt: 1, mb: 3 }}>
            Expenses
          </Typography>
          <ViewExpenses daybookView defaultExpenses={daybookData.expenses} />

          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Ledgers
          </Typography>
          <Ledgers daybookView defaultLedgers={daybookData.ledgers} />
        </div>
      )}
    </div>
  );
};

export default Daybook;
