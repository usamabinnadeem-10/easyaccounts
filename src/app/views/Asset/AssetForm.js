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
} from '../../utilities/formUtils';

import { ASSET_TYPES, ASSET_STATUS } from '../../../constants/choices';

import { INITIAL_VALUES } from './constants';
import { schema } from './validation';

const Row = ({ children }) => {
  return (
    <Grid container justifyContent='space-between' gap={3}>
      {React.Children.map(children, (child) => (
        <Grid item xs={12} sm={5}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

const AssetForm = ({ isEdit = false, editData, onSubmit, loading }) => {
  return (
    <Formik
      enableReinitialize={isEdit}
      initialValues={isEdit ? editData : INITIAL_VALUES}
      validationSchema={schema}
      onSubmit={(values, actions) => onSubmit(values, actions)}>
      {({ handleSubmit }) => (
        <Form>
          <Grid container gap={3}>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            {isEdit && (
              <Row>
                <FastField
                  component={FormAutoCompleteField}
                  options={ASSET_STATUS}
                  name='status'
                  label='Asset type'
                />
              </Row>
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
