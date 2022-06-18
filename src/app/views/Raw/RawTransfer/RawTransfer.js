import React from 'react';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from '../common/styled';

const RawTransfer = () => {
  return (
    <ViewWrapper marginBottom={4} heading='Kora Transfer' width={80}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) => console.log(formatForm(values))}>
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form>
            <Grid container direction='column' gap={3}>
              <MetaContainer container direction='column' gap={2}>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormTextField}
                      name={FIELDS.manual_invoice_serial}
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
                isTransfer
              />
              <Button variant='contained' onClick={handleSubmit}>
                TRANSFER KORA STOCK
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default RawTransfer;
