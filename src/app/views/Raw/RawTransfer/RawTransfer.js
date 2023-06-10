import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Formik, Form, FastField } from 'formik';

import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormDateField, FormTextField } from '../../../utilities/formUtils';

import { INITIAL_VALUES, FIELDS } from './constants';
import { schema } from './validation';
import { formatForm } from './utils';
import { MetaContainer } from '../common/styled';

import axiosApi from '../../../../utils/axiosApi';
import { RAW_APIS } from '../../../../constants/restEndPoints';

import { withSnackbar } from '../../../hoc/withSnackbar';

import { findErrorMessage } from '../../../utilities/objectUtils';

import * as api from './api';
import * as utils from './utils';

const RawTransfer = ({ showErrorSnackbar, showSuccessSnackbar }) => {
  const { uuid } = useParams();
  const history = useHistory();
  const essentials = useSelector((state) => state.essentials);
  const [isLoading, setIsLoading] = useState(false);
  const [transfer, setTransfer] = useState(false);

  useEffect(() => {
    if (uuid) {
      fetchTransaction(uuid);
    }
  }, [uuid]);

  const fetchTransaction = async (uuid) => {
    const transaction = await api.fetchTransaction(uuid);
    setTransfer(utils.formatTransferForEditing(transaction, essentials));
  };

  const createOrEditTransfer = async (data, actions) => {
    const URL = uuid ? RAW_APIS.EDIT.transfer(uuid) : RAW_APIS.CREATE.TRANSFER;
    try {
      setIsLoading(true);
      const response = await axiosApi.request({
        url: URL,
        method: uuid ? 'PUT' : 'POST',
        data,
      });
      history.push(`/home/raw-transfer/receipt/${response.data.id}`);
      setIsLoading(false);
      showSuccessSnackbar(uuid ? 'Transfer edited' : 'Transfer created');
      actions.resetForm();
    } catch (error) {
      setIsLoading(false);
      showErrorSnackbar(findErrorMessage(error?.response?.data));
    }
  };

  return (
    <ViewWrapper marginBottom={4} heading="Kora Transfer" width={80}>
      <Formik
        initialValues={transfer || INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) =>
          createOrEditTransfer(formatForm(values), actions)
        }
        enableReinitialize
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
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
                setFieldValue={setFieldValue}
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
