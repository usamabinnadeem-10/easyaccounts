import React, { useState } from 'react';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from '../common/styled';

import axiosApi from '../../../../utils/axiosApi';
import { RAW_APIS } from '../../../../constants/restEndPoints';

import { withSnackbar } from '../../../hoc/withSnackbar';

import { findErrorMessage } from '../../../utilities/objectUtils';

const RawTransfer = ({ showErrorSnackbar, showSuccessSnackbar }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createTransfer = async (data, actions) => {
    try {
      setIsLoading(true);
      const response = await axiosApi.post(RAW_APIS.CREATE.TRANSFER, data);
      setIsLoading(false);
      showSuccessSnackbar('Transfer created');
      actions.resetForm();
    } catch (error) {
      setIsLoading(false);
      showErrorSnackbar(findErrorMessage(error?.response?.data));
    }
  };

  return (
    <ViewWrapper marginBottom={4} heading="Kora Transfer" width={80}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) =>
          createTransfer(formatForm(values), actions)
        }
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <Grid container direction="column" gap={3}>
              <MetaContainer container direction="column" gap={2}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormTextField}
                      name={FIELDS.manual_serial}
                      label="Book #"
                      fullWidth
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormDateField}
                      name={FIELDS.date}
                      label="Date"
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
                loading={isLoading}
                variant="contained"
                onClick={handleSubmit}
              >
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
