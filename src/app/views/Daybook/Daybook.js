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

  const findIndexAndAppendData = (array, data) => {
    let newAccountsData = [...array];
    data.forEach((element) => {
      let idx = newAccountsData.findIndex(
        (account) => account.account_type === element.account_type__name
      );
      if (idx >= 0) {
        let prevBalance = newAccountsData[idx].balance;
        newAccountsData[idx] = {
          ...newAccountsData[idx],
          balance:
            element.nature === "C"
              ? prevBalance + element.amount
              : prevBalance - element.amount,
        };
      } else {
        newAccountsData.push({
          account_type: element.account_type__name,
          balance: element.amount,
        });
      }
    });
    return newAccountsData;
  };

  const formatAccountsData = (ledgersData, expensesData) => {
    let newAccountsData = [];
    newAccountsData = findIndexAndAppendData(newAccountsData, ledgersData);
    newAccountsData = findIndexAndAppendData(newAccountsData, expensesData);
    return newAccountsData;
  };

  const fetchDaybook = () => {
    setLoading(true);
    instance.get(ESSENTIAL_URLS.DAY_BOOK).then((res) => {
      setTransactions(res.data.transactions);
      setLedgers(res.data.ledgers);
      setExpenses(res.data.expenses);
      setAccounts(
        formatAccountsData(res.data.balance_ledgers, res.data.balance_expenses)
      );
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
