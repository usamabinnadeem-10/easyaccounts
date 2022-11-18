import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomModal from '../../components/CustomModal';

import { FormAutoCompleteField } from '../../utilities/formUtils';
import { FormTextField } from '../../utilities/formUtils';
import { FormDateField } from '../../utilities/formUtils';

import * as api from './api';
import * as schema from './validation';
import { getInitialValues } from './constants';
import { FIELDS } from './constants';

import { StyledButton } from './styled';

import { BANKS } from '../../../constants/banks';
import { withSnackbar } from '../../hoc/withSnackbar';
import { findErrorMessage } from '../../utilities/objectUtils';
import { convertDate } from '../../utilities/stringUtils';

import { formatValues } from '../ChequeForm/utils';

const CreateChequeHistory = ({
  chequeId,
  isChequeEntry,
  open,
  onClose,
  chequeSerial,
  ...props
}) => {
  const accounts = useSelector((state) => state.essentials.accountTypes);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    api
      .createChequeHistory(
        {
          ...formatValues(values),
          due_date: convertDate(
            'yyyy-MM-DD HH:mm:ss',
            'yyyy-MM-DD',
            values.due_date
          ),
        },
        isChequeEntry
      )
      .then((response) => {
        setLoading(false);
        props.showSuccessSnackbar('Added successfully');
        onClose();
        actions.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        props.showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  return (
    <CustomModal open={open} handleClose={onClose}>
      <Formik
        initialValues={getInitialValues(chequeId, isChequeEntry)}
        validationSchema={isChequeEntry ? schema.CHEQUE : schema.OTHER}
        onSubmit={async (values, actions) => handleSubmit(values, actions)}>
        <Form>
          <Grid container direction='column' gap={2} alignItems='center'>
            <Typography variant='h6'>
              <Typography variant='h6' component='span' color='primary'>
                Cheque # {chequeSerial}{' '}
              </Typography>
              {isChequeEntry ? 'Add Cheque (History)' : 'Add Payment (History)'}
            </Typography>
            <Field
              component={FormTextField}
              size='small'
              name={FIELDS.AMOUNT}
              label={isChequeEntry ? 'Cheque Amount' : 'Amount'}
              fullWidth
            />
            {isChequeEntry && (
              <>
                <Field
                  component={FormAutoCompleteField}
                  options={BANKS}
                  name={FIELDS.BANK}
                  label='Select Bank'
                />
                <Field
                  component={FormTextField}
                  size='small'
                  name={FIELDS.CHEQUE_NUMBER}
                  label='Cheque Number'
                  fullWidth
                />
                <Field
                  component={FormDateField}
                  name={FIELDS.DUE_DATE}
                  label='Due Date'
                  size='small'
                  fullWidth
                />
              </>
            )}
            {!isChequeEntry && (
              <Field
                component={FormAutoCompleteField}
                options={accounts}
                name={FIELDS.ACCOUNT_TYPE}
                label='Account Type'
              />
            )}

            <Field
              component={FormDateField}
              name={FIELDS.DATE}
              label='Entry Date'
              size='small'
              fullWidth
            />
            <StyledButton
              type='submit'
              fullWidth
              variant='contained'
              loading={loading}>
              Submit
            </StyledButton>
          </Grid>
        </Form>
      </Formik>
    </CustomModal>
  );
};

export default withSnackbar(CreateChequeHistory);
