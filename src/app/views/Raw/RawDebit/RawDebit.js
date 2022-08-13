import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';

import CustomToggleButtons from '../../../components/CustomToggleButtons';
import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, RAW_TRANSACTION_TYPES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from './styled';
import { saleOrReturnApi } from './api';

import { withSnackbar } from '../../../hoc/withSnackbar';

const RawDebit = ({ showErrorSnackbar, showSuccessSnackbar }) => {
  const essentials = useSelector((state) => state.essentials);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    saleOrReturnApi(values)
      .then((response) => {
        showSuccessSnackbar('Posted');
        setLoading(false);
      })
      .catch((error) => {
        showErrorSnackbar(error.response.data);
        setLoading(false);
      });
  };

  return (
    <ViewWrapper marginBottom={4} heading='Kora Sale/Return' width={80}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) =>
          handleSubmit(formatForm(values, actions))
        }>
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form>
            <Grid container direction='column' gap={3}>
              <MetaContainer container direction='column' gap={2}>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormAutoCompleteField}
                      options={[
                        ...essentials.suppliers,
                        ...essentials.customers,
                      ]}
                      name={FIELDS.person}
                      label='Person'
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <CustomToggleButtons
                      buttons={RAW_TRANSACTION_TYPES}
                      getSelectedValue={(value) =>
                        setFieldValue(FIELDS.debit_type, value)
                      }
                      selectedValue={values[FIELDS.transaction_type]}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent='space-between'>
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
                </Grid>
              </MetaContainer>
              <RawDetailForm
                errors={errors}
                touched={touched}
                values={values}
              />
              <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}>
                POST
              </LoadingButton>
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default withSnackbar(RawDebit);
