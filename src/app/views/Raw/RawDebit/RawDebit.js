import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { Grid } from '@mui/material';
import { TextField } from '@mui/material';

import CustomLoader from '../../../components/CustomLoader';
import CustomToggleButtons from '../../../components/CustomToggleButtons';
import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, RAW_DEBIT_TYPES, FIELDS } from './constants';
import { schema } from './validation';
import { MetaContainer } from './styled';

const RawDebit = () => {
  const essentials = useSelector((state) => state.essentials);

  useEffect(() => {}, []);

  return (
    <ViewWrapper marginBottom={4} heading='Kora Debit' width={80}>
      <Formik initialValues={INITIAL_VALUES} validationSchema={schema}>
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          handleSubmit,
        }) => (
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
                      buttons={RAW_DEBIT_TYPES}
                      getSelectedValue={(value) =>
                        setFieldValue(FIELDS.debit_type, value)
                      }
                      selectedValue={values[FIELDS.debit_type]}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormTextField}
                      name={FIELDS.manual_invoice_serial}
                      label='Book #'
                      fullWidth
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
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default RawDebit;
