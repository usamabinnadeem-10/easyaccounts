import React from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import DetailedView from './DetailedView';
import CondensedView from './CondensedView';

import ViewTransactions from '../ViewTransactions';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomLoader from '../../components/CustomLoader';
import Heading from '../../components/Heading';
import CustomToggleButtons from '../../components/CustomToggleButtons/CustomToggleButtons';
import AccountTypeCard from '../../components/AccountTypeCard/AccountTypeCard';

import { Button, Typography, Grid } from '@mui/material';

import { useStyles } from './styles';

import moment from 'moment';
import { getDaybook } from '../../../store/accounts/actions';
import { getTotalSale } from './utils';

const Daybook = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const daybookData = useSelector((state) => state.accounts.daybook);
  const [date, setDate] = React.useState(null);
  const [displayDate, setDisplayDate] = React.useState(null);
  const [viewType, setViewType] = React.useState('detailed');

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
          <Grid container className={classes.header}>
            <Heading heading={`Daybook for ${displayDate}`} />
            <Grid container gap={2}>
              <Button
                variant="contained"
                size="small"
                onClick={() => dispatch(getDaybook(date))}
              >
                REFRESH
              </Button>
              <CustomDatePicker
                fullWidth={false}
                placeholder="Date"
                getDate={(date) => setDate(date)}
                value={date}
                isEndDate
              />
              <CustomToggleButtons
                buttons={[
                  {
                    name: 'Detailed',
                    value: 'detailed',
                    color: 'success',
                    accountTypes: true,
                  },
                  {
                    name: 'Condensed',
                    value: 'condensed',
                    color: 'info',
                  },
                ]}
                selectedValue={viewType}
                getSelectedValue={(viewType) => setViewType(viewType)}
              />
            </Grid>
          </Grid>

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
              },
            )}
          </div>

          {daybookData.transactions.length > 0 && (
            <>
              <Typography variant="button" fontWeight={900} sx={{ mb: 1 }}>
                Transactions
              </Typography>
              <Typography variant="button">
                Sale : {getTotalSale(daybookData.transactions)}
              </Typography>
              <ViewTransactions
                {...props}
                daybookView
                defaultTransactions={daybookData.transactions}
              />
            </>
          )}

          {viewType === 'detailed' && (
            <DetailedView daybookData={daybookData} {...props} />
          )}
          {viewType === 'condensed' && (
            <CondensedView daybookData={daybookData} {...props} />
          )}
        </div>
      )}
    </div>
  );
};

export default Daybook;
