import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from '../common/styled';
import { transferApi } from './api';

import { withSnackbar } from '../../../hoc/withSnackbar';

const RawTransfer = ({ showSuccessSnackbar, showErrorSnackbar }) => {
  const essentials = useSelector((state) => state.essentials);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    transferApi(values)
      .then((response) => {
        showSuccessSnackbar('Done');
        setLoading(false);
        actions.resetForm();
      })
      .catch((error) => {
        showErrorSnackbar(error.response.data);
        setLoading(false);
      });
  };

  return (
    <ViewWrapper marginBottom={4} heading='Kora Transfer' width={80}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) =>
          handleSubmit(formatForm(values), actions)
        }>
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form>
            <Grid container direction='column' gap={3}>
              <MetaContainer container direction='column' gap={2}>
                <Grid container justifyContent='space-between' gap={2}>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormTextField}
                      name={FIELDS.manual_serial}
                      label='Book #'
                      fullWidth
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormDateField}
                      name={FIELDS.date}
                      label='Date'
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormAutoCompleteField}
                      name={FIELDS.from_warehouse}
                      options={essentials.warehouses}
                      label='From Warehouse'
                    />
                  </Grid>
                </Grid>
              </MetaContainer>
              <RawDetailForm
                errors={errors}
                touched={touched}
                values={values}
                isTransfer
              />
              <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}>
                TRANSFER KORA STOCK
              </LoadingButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default withSnackbar(RawTransfer);
