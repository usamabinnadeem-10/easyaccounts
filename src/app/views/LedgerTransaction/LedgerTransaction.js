import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router';

import CustomToggleButtons from '../../components/CustomToggleButtons/CustomToggleButtons';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import SelectPerson from '../../components/SelectPerson/SelectPerson';
import Heading from '../../components/Heading';

import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Select from 'react-select';

import { useStyles } from './styles';
import * as constants from './constants';
import {
  PERSON_TYPES,
  STORE_PERSON,
} from '../../components/SelectPerson/constants';
import { setShouldFetchDaybook } from '../../../store/accounts/actions';
import { LEDGER_URLS } from '../../../constants/restEndPoints';
import instance from '../../../utils/axiosApi';
import { getURL, convertDate } from '../../utilities/stringUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

function LedgerTransaction(props) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);

  const [title, setTitle] = useState('New Ledger Entry');
  const [transactionType, setTransactionType] = useState(
    constants.TRANSACTION_TYPES[0].value
  );
  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [accountType, setAccountType] = useState(null);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [detail, setDetail] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (location.state) {
      let data = location.state;
      let person = props.persons[data.person];
      setTitle('Edit Ledger Entry');
      setCurrentPerson(person);
      setPersonType(person.person_type);
      setAccountType(props.accounts[data.account_type]);
      setAmount(data.amount);
      setTransactionType(data.nature);
      setDetail(data.detail);
      setDate(convertDate('DD-MM-YYYY', 'YYYY-MM-DD', data.date));
    }
  }, []);

  const LEDGER_FIELDS = [
    {
      placeholder: 'Amount',
      type: 'number',
      action: setAmount,
      value: amount,
    },
    {
      placeholder: 'Detail',
      type: 'text',
      action: setDetail,
      value: detail,
    },
  ];

  const resetState = () => {
    setDate(null);
    setAmount('');
    setDetail('');
  };

  const postLedger = () => {
    const balance = parseFloat(amount);
    if (!currentPerson) {
      props.showErrorSnackbar(constants.ERRORS.NO_PERSON + personType);
      return;
    }
    if (!balance) {
      props.showErrorSnackbar(constants.ERRORS.NO_AMOUNT);
      return;
    }

    if (
      transactionType === constants.TRANSACTION_TYPES[1].value &&
      !accountType
    ) {
      props.showErrorSnackbar(constants.ERRORS.NO_ACCOUNT);
      return;
    }
    setPosting(true);
    let data = {
      person: currentPerson.value,
      detail: detail,
      amount: balance,
      nature: transactionType,
      account_type: accountType?.value || null,
    };
    if (date) {
      data['date'] = date;
    }
    if (!location.state) {
      instance
        .post(LEDGER_URLS.CREATE_LEDGER, data)
        .then((res) => {
          dispatch(setShouldFetchDaybook(true));
          setPosting(false);
          resetState();
          props.showSuccessSnackbar(constants.SUCCESS.POST);
        })
        .catch((error) => {
          setPosting(false);
          props.showErrorSnackbar(constants.ERRORS.OOPS);
        });
    } else {
      instance
        .put(getURL(LEDGER_URLS.UPDATE_LEDGER, 'uuid', location.state.id), data)
        .then((res) => {
          dispatch(setShouldFetchDaybook(true));
          setPosting(false);
          resetState();
          props.showSuccessSnackbar(constants.SUCCESS.EDIT);
        })
        .catch((error) => {
          setPosting(false);
          props.showErrorSnackbar(constants.ERRORS.OOPS);
        });
    }
  };

  const handleSetAccountType = (account) => {
    account?.value === accountType?.value
      ? setAccountType(null)
      : setAccountType(account);
  };

  return (
    <>
      <Grid container direction='column' className={classes.root}>
        <Grid container justifyContent='space-between' sx={{ mb: 4 }}>
          <Heading heading={title} />
          <CustomToggleButtons
            buttons={constants.TRANSACTION_TYPES}
            selectedValue={transactionType}
            getSelectedValue={(value) => setTransactionType(value)}
          />
        </Grid>

        <Grid
          container
          justifyContent='space-between'
          className={`${classes.container}`}>
          <Select
            placeholder={'Account Type'}
            value={accountType}
            onChange={(account) => handleSetAccountType(account)}
            options={state.accountTypes}
          />
          <CustomDatePicker
            getDate={(date) => setDate(date)}
            value={date}
            fullWidth={false}
          />
        </Grid>

        <SelectPerson
          currentPerson={currentPerson}
          personType={personType}
          setCurrentPerson={setCurrentPerson}
          options={state[STORE_PERSON[personType]]}
          setPersonType={setPersonType}
        />

        <Grid container direction='column'>
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
                multiline={field.type === 'text'}
                size='small'
                value={field.value}
                onChange={(e) => field.action(e.target.value || '')}
              />
            );
          })}
        </Grid>

        <LoadingButton
          loadingIndicator={<CustomLoader loading={posting} />}
          loading={posting}
          onClick={() => postLedger()}
          variant='contained'
          sx={{ mt: 3, mb: 2, fontWeight: 900 }}>
          {location.state ? 'Edit' : 'Post'}
        </LoadingButton>
      </Grid>
    </>
  );
}

export default withSnackbar(LedgerTransaction);
