import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import CustomToggleButtons from '../../../components/CustomToggleButtons';
import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, RAW_DEBIT_TYPES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from './styled';

import instance from '../../../../utils/axiosApi';
import { RAW_APIS } from '../../../../constants/restEndPoints';

import { withSnackbar } from '../../../hoc/withSnackbar';

import { findErrorMessage } from '../../../utilities/objectUtils';

const RawDebit = ({ showSuccessSnackbar, showErrorSnackbar }) => {
  const essentials = useSelector((state) => state.essentials);
  const [loading, setLoading] = useState(false);
  const createTransaction = async (data, actions) => {
    try {
      setLoading(true);
      const response = await instance.post(
        RAW_APIS.CREATE.SALE_OR_RETURN,
        data,
      );
      if (response.data) {
        showSuccessSnackbar('Debit entry created');
        actions.resetForm();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorSnackbar(findErrorMessage(error.response?.data));
    }
  };

  return (
    <ViewWrapper marginBottom={4} heading="Kora Sale/Return" width={80}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) =>
          createTransaction(formatForm(values), actions)
        }
      >
        {({ values, errors, touched, setFieldValue, handleSubmit }) => (
          <Form>
            <Grid container direction="column" gap={3}>
              <MetaContainer container direction="column" gap={2}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormAutoCompleteField}
                      options={[
                        ...essentials.suppliers,
                        ...essentials.customers,
                      ]}
                      name={FIELDS.person}
                      label="Person"
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
              />
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleSubmit}
              >
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
