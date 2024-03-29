import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { Field } from 'formik';
import { FastField } from 'formik';

import {
  FormAutoCompleteField,
  FormDateField,
  FormTextField,
  FormSwitchField,
} from '../../utilities/formUtils';

import CustomToggleButtons from '../../components/CustomToggleButtons';
import Heading from '../../components/Heading';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { getPersonBalanceApi } from './api';
import { useStyles } from './styles';

function TransactionHeader(props) {
  const {
    values,
    setFieldValue,
    personIdentifier,
    updateMetaData,
    selectedOptions,
    transactionTypes,
    metaConstants,
    showAccountTypes,
    options,
    handleReloadStock,
  } = props;
  const classes = useStyles();

  const [currentBalance, setCurrentBalance] = useState(null);
  // get person balance
  useEffect(() => {
    if (values.person?.value) {
      getPersonBalanceApi(values.person.value).then((response) => {
        setCurrentBalance(response.data[values.person.label]);
      });
    } else {
      setCurrentBalance(null);
    }
  }, [values.person]);

  return (
    <>
      <Heading heading={`New ${personIdentifier} Transaction`} />
      <Grid container rowSpacing={3} columnSpacing={4} sx={{ mb: 4 }}>
        <Grid item xs={6} className={`${classes.selectCustomer}`}>
          <FastField
            component={FormAutoCompleteField}
            options={options.people}
            name="person"
            label={personIdentifier}
          />
          {currentBalance && (
            <div className={classes.currentBalance}>
              <Typography
                variant="subtitle2"
                color={currentBalance >= 0 ? 'success.main' : 'error.main'}
              >{`${Math.abs(currentBalance)} ${
                currentBalance >= 0 ? ' CR' : ' DB'
              }`}</Typography>
            </div>
          )}
          {currentBalance && (
            <div className={classes.currentBalance}>
              <Typography
                variant="subtitle2"
                color={currentBalance >= 0 ? 'success.main' : 'error.main'}
              >{`${Math.abs(currentBalance)} ${
                currentBalance >= 0 ? ' CR' : ' DB'
              }`}</Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <FastField
            component={FormDateField}
            name="date"
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <FastField
            component={FormTextField}
            name="manual_serial"
            label="Book serial"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FastField
            component={FormTextField}
            name="builty"
            label="Builty #"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            component={FormTextField}
            name="wasooli_number"
            label="Wasooli number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            disabled={!showAccountTypes}
            component={FormAutoCompleteField}
            options={options.accountTypes || []}
            name="account_type"
            label="Account type"
          />
        </Grid>

        <Grid item xs={12} className={classes.metaItems}>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <CustomToggleButtons
                buttons={transactionTypes}
                getSelectedValue={(type) => {
                  updateMetaData(metaConstants.transactionType, type);
                  setFieldValue('type', type);
                }}
                selectedValue={selectedOptions.currentTransactionType}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.metaItems}>
          <Grid container>
            <Grid item xs={6}>
              <FastField
                component={FormSwitchField}
                label="Mark as incomplete"
                onCheckedLabel="Incomplete Invoice"
                name="requires_action"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                component={FormSwitchField}
                label="Cancel bill"
                onCheckedLabel="Cancelled"
                name="is_cancelled"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.metaItems}>
          <Button onClick={handleReloadStock} size="small" variant="contained">
            Reload Stock
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default TransactionHeader;
