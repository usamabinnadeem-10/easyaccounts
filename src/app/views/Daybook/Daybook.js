import React from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import ChequeList from '../../components/ChequeList';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomLoader from '../../components/CustomLoader';
import PaymentList from '../../views/PaymentList';
import ViewTransactions from '../ViewTransactions';
import ViewExpenses from '../ViewExpenses';
import AccountTypeCard from '../../components/AccountTypeCard/AccountTypeCard';
import ChequeHistoryTable from '../../components/ChequeHistoryTable';

import { Button } from '@mui/material';
import { Typography } from '@mui/material';

import { useStyles } from './styles';

import moment from 'moment';
import { getDaybook } from '../../../store/accounts/actions';

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
      dispatch(getDaybook(date));
      setDisplayDate(moment(date, 'YYYY-MM-DD').format('Do MMMM YYYY'));
    } else {
      setDisplayDate(moment().format('Do MMMM YYYY'));
    }
  }, [date]);

  return (
    <div>
      {!daybookData.fetched ? (
        <CustomLoader pageLoader loading={!daybookData.fetched} />
      ) : (
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography variant='h5' fontWeight={900}>
              Daybook for {displayDate}
            </Typography>
            <div>
              <Button
                variant='contained'
                size='small'
                sx={{ mr: 2 }}
                onClick={() => dispatch(getDaybook(date))}>
                REFRESH
              </Button>
              <CustomDatePicker
                fullWidth={false}
                placeholder='Date'
                getDate={(date) => setDate(date)}
                value={date}
                isEndDate
              />
            </div>
          </div>

          <Typography variant='button' fontWeight={900} sx={{ mb: 2 }}>
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
              <Typography variant='button' fontWeight={900} sx={{ mb: 1 }}>
                Transactions
              </Typography>
              <ViewTransactions
                {...props}
                daybookView
                defaultTransactions={daybookData.transactions}
              />
            </>
          )}

          {daybookData?.expenses?.length > 0 && (
            <>
              <Typography
                variant='button'
                fontWeight={900}
                sx={{ mt: 1, mb: 3 }}>
                Expenses
              </Typography>
              <ViewExpenses
                {...props}
                daybookView
                defaultExpenses={daybookData.expenses}
              />
            </>
          )}

          {daybookData.payments.length > 0 && (
            <>
              <Typography
                variant='button'
                fontWeight={900}
                sx={{ mt: 3, mb: 1 }}>
                Payments
              </Typography>
              <PaymentList
                {...props}
                daybookView
                daybookPayments={daybookData.payments}
                // defaultLedgers={daybookData.ledgers}
              />
            </>
          )}
          {daybookData.externalCheques.length > 0 && (
            <>
              <Typography
                variant='button'
                fontWeight={900}
                sx={{ mt: 3, mb: 1 }}>
                Party Cheques
              </Typography>
              <ChequeList
                isPersonal={false}
                cheques={daybookData.externalCheques}
                persons={props.persons}
                accounts={props.accounts}
              />
            </>
          )}
          {daybookData.externalChequesHistory.length > 0 && (
            <>
              <Typography
                variant='button'
                fontWeight={900}
                sx={{ mt: 3, mb: 1 }}>
                Party Cheques History
              </Typography>
              <ChequeHistoryTable
                historyData={daybookData.externalChequesHistory}
                accounts={props.accounts}
              />
            </>
          )}
          {daybookData.personalCheques.length > 0 && (
            <>
              <Typography
                variant='button'
                fontWeight={900}
                sx={{ mt: 3, mb: 1 }}>
                Personal Cheques
              </Typography>
              <ChequeList
                isPersonal={true}
                cheques={daybookData.personalCheques}
                persons={props.persons}
                accounts={props.accounts}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Daybook;
