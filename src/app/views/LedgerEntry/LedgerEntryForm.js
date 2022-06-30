import React from 'react';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import {
  FormAutoCompleteField,
  FormTextField,
  FormDateField,
  FormRow,
} from '../../utilities/formUtils';

import { INITIAL_VALUES, NATURES } from './constants';
import { schema } from './validation';

const LedgerEntryForm = ({
  isEdit,
  editData,
  personOptions,
  accountTypes,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Formik
      enableReinitialize={isEdit}
      validationSchema={schema}
      initialValues={isEdit ? editData : INITIAL_VALUES}
      onSubmit={(values, actions) => handleSubmit(values, actions)}>
      <Form>
        <Grid container gap={2} direction='column'>
          <FormRow>
            <FastField
              component={FormAutoCompleteField}
              options={personOptions}
              label='Ledger Head'
              name='person'
            />
            <FastField component={FormDateField} label='Date' name='date' />
          </FormRow>
          <FormRow>
            <FastField
              component={FormAutoCompleteField}
              options={NATURES}
              label='Nature'
              name='nature'
            />
            <FastField
              component={FormTextField}
              type='number'
              label='Amount'
              fullWidth
              name='amount'
            />
          </FormRow>
          <FormRow>
            <FastField
              component={FormAutoCompleteField}
              options={accountTypes}
              label='Account type'
              name='account_type'
            />
            <FastField
              component={FormTextField}
              fullWidth
              label='Detail'
              name='detail'
            />
          </FormRow>
          <Button
            variant='contained'
            fullWidth
            isLoading={isLoading}
            type='submit'>
            {isEdit ? 'Edit' : 'Post'}
          </Button>
        </Grid>
      </Form>
    </Formik>
  );
};

export default LedgerEntryForm;
