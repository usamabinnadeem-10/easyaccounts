import React from 'react';

import { Formik } from 'formik';
import { Form } from 'formik';

import { FastField } from 'formik';

import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import {
  FormAutoCompleteField,
  FormTextField,
  FormDateField,
  FormRow,
} from '../../utilities/formUtils';

import { ASSET_TYPES, ASSET_STATUS } from '../../../constants/choices';

import { INITIAL_VALUES } from './constants';
import { schema } from './validation';

const AssetForm = ({ isEdit = false, editData, onSubmit, loading }) => {
  return (
    <Formik
      enableReinitialize={isEdit}
      initialValues={isEdit ? editData : INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={(values, actions) => onSubmit(values, actions)}>
      {({ values, handleSubmit }) => (
        <Form>
          <Grid container gap={3}>
            <FormRow>
              <FastField
                component={FormDateField}
                fullWidth
                label='Date'
                name='date'
              />
              <FastField
                component={FormTextField}
                fullWidth
                label='Asset name'
                name='name'
              />
            </FormRow>
            <FormRow>
              <FastField
                component={FormAutoCompleteField}
                options={ASSET_TYPES}
                name='type'
                label='Asset type'
              />
              <FastField
                component={FormTextField}
                fullWidth
                label='Asset Value'
                type='number'
                name='value'
              />
            </FormRow>
            {isEdit && (
              <FormRow>
                <FastField
                  component={FormAutoCompleteField}
                  options={ASSET_STATUS}
                  name='status'
                  label='Asset type'
                />
              </FormRow>
            )}
            {isEdit && values.status.value === 'S' && (
              <FormRow>
                <FastField
                  component={FormTextField}
                  name='sold_value'
                  type='number'
                  fullWidth
                  label='Selling price'
                />
                <FastField
                  component={FormDateField}
                  name='sold_date'
                  label='Selling date'
                />
              </FormRow>
            )}
            <LoadingButton
              fullWidth
              variant='contained'
              loading={loading}
              onClick={handleSubmit}>
              {isEdit ? 'Edit' : 'Post'}
            </LoadingButton>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AssetForm;
