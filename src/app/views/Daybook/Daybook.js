import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Ledgers from "../Ledgers/Ledgers";
import ViewTransactions from "../ViewTransactions/ViewTransactions";
import ViewExpenses from "../ViewExpenses/ViewExpenses";
import AccountTypeCard from "../../components/AccountTypeCard/AccountTypeCard";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";

import { useStyles } from "./styles";

import moment from "moment";
import instance from "../../../utils/axiosApi";
import { ESSENTIAL_URLS } from "../../../constants/restEndPoints";

const Daybook = () => {
  const classes = useStyles();

  const [transactions, setTransactions] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDaybook = () => {
    setLoading(true);
    instance.get(ESSENTIAL_URLS.DAY_BOOK).then((res) => {
      setTransactions(res.data.transactions);
      setLedgers(res.data.ledgers);
      setExpenses(res.data.expenses);
      setAccounts(res.data.accounts);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDaybook();
  }, []);

  return (
    <div>
      {loading ? (
        <CustomLoader pageLoader loading={loading} />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography variant="h5" fontWeight={900}>
              Daybook for {moment().format("Do MMMM YYYY")}
            </Typography>
            <Button
              onClick={() => fetchDaybook()}
              startIcon={<SyncIcon />}
              variant="contained"
              sx={{ fontWeight: 900 }}
            >
              Refresh
            </Button>
          </div>

          <Typography variant="button" fontWeight={900} sx={{ mb: 2 }}>
            Account Balances
          </Typography>
          <div className={classes.accountTypesWrapper}>
            {accounts.map((account, index) => {
              return <AccountTypeCard account={account} key={index} />;
            })}
          </div>

          <Typography variant="button" fontWeight={900} sx={{ mb: 1 }}>
            Transactions
          </Typography>
          <ViewTransactions daybookView defaultTransactions={transactions} />

          <Typography variant="button" fontWeight={900} sx={{ mt: 1, mb: 3 }}>
            Expenses
          </Typography>
          <ViewExpenses daybookView defaultExpenses={expenses} />

          <Typography variant="button" fontWeight={900} sx={{ mt: 3, mb: 1 }}>
            Ledgers
          </Typography>
          <Ledgers daybookView defaultLedgers={ledgers} />
        </div>
      )}
    </div>
  );
};

export default Daybook;
