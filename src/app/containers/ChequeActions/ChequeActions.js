import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Field } from 'formik';

import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import {
  FormAutoCompleteField,
  FormDateField,
} from '../../utilities/formUtils';

import { API_MAPPING } from './api';
import { ACTION_TYPES } from './constants';
import { FIELDS } from './constants';
import { getInitialValues } from './constants';
import { getSchema } from './validation';
import { StyledButton } from './styled';
import { StyledPaper } from './styled';
import { StyledForm } from './styled';

import { withSnackbar } from '../../hoc/withSnackbar';
import { findErrorMessage } from '../../utilities/objectUtils';

import { formatValues } from '../ChequeForm/utils';
import { ACTIONS } from '../SideBar/constants';

const ChequeActions = ({
  open,
  onClose,
  chequeId,
  isPersonal,
  actionType,
  ...props
}) => {
  const accounts = useSelector((state) => state.essentials.accountTypes);
  const suppliers = useSelector((state) => state.essentials.suppliers);
  const customers = useSelector((state) => state.essentials.customers);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    API_MAPPING[actionType](formatValues(values))
      .then((response) => {
        setLoading(false);
        props.showSuccessSnackbar(`Cheque ${actionType} successfully`);
        actions.resetForm();
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        props.showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  const getActionComponents = (setFieldValue) => {
    if (isPersonal) {
      if (
        actionType === ACTION_TYPES.PERSONAL.PASS ||
        actionType === ACTION_TYPES.PERSONAL.CANCEL
      ) {
        return <></>;
      } else if (actionType === ACTION_TYPES.PERSONAL.RETURN) {
        return (
          <Field
            component={FormDateField}
            name={FIELDS.DATE}
            label='Return Date'
          />
        );
      } else if (actionType === ACTION_TYPES.PERSONAL.RE_ISSUE) {
        return (
          <>
            <Field
              component={FormDateField}
              name={FIELDS.DATE}
              label='Re-issue date'
            />
            <Field
              component={FormAutoCompleteField}
              options={[...suppliers, ...customers]}
              name={FIELDS.PERSON}
              label='Select Party'
            />
          </>
        );
      } else {
        return <></>;
      }
      // switch (actionType) {
      //   case ACTION_TYPES.PERSONAL.PASS || ACTION_TYPES.PERSONAL.CANCEL:
      //     return <></>;
      //   case ACTION_TYPES.PERSONAL.RETURN:
      //     return (
      //       <Field
      //         component={FormDateField}
      //         name={FIELDS.DATE}
      //         label='Return Date'
      //       />
      //     );
      //   case ACTION_TYPES.PERSONAL.RE_ISSUE:
      //     return (
      //       <>
      //         <Field
      //           component={FormDateField}
      //           name={FIELDS.DATE}
      //           label='Re-issue date'
      //         />
      //         <Field
      //           component={FormAutoCompleteField}
      //           options={[...suppliers, ...customers]}
      //           name={FIELDS.PERSON}
      //           label='Select Party'
      //         />
      //       </>
      //     );
      //   default:
      //     return <></>;
      // }
    } else {
      if (actionType === ACTION_TYPES.EXTERNAL.PASS) {
        return (
          <>
            <Field
              component={FormAutoCompleteField}
              options={accounts}
              name={FIELDS.ACCOUNT_TYPE}
              label='Select Account'
            />
            <Field
              component={FormDateField}
              name={FIELDS.DATE}
              label='Clearing date'
            />
          </>
        );
      } else if (actionType === ACTION_TYPES.EXTERNAL.TRANSFER) {
        return (
          <>
            <Field
              component={FormDateField}
              name={FIELDS.DATE}
              label='Transfer date'
            />
            <Field
              onChange={(event, value, reason) => {
                if (reason === 'clear' || !value) {
                  setFieldValue(FIELDS.PERSON, '');
                } else {
                  setFieldValue(FIELDS.PERSON, value?.value);
                }
              }}
              component={FormAutoCompleteField}
              options={[...suppliers, ...customers]}
              name={FIELDS.PERSON}
              label='Select Party'
            />
          </>
        );
      } else if (
        actionType === ACTION_TYPES.EXTERNAL.RETURN ||
        actionType === ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED
      ) {
        return (
          <Field
            component={FormDateField}
            name={FIELDS.DATE}
            label='Return date'
          />
        );
      } else if (actionType === ACTION_TYPES.EXTERNAL.COMPLETE_HISTORY) {
        return <></>;
      } else {
        return <></>;
      }
    }
  };

  return (
    <Modal paper='true' open={open} onClose={onClose}>
      <StyledPaper>
        <Typography variant='h6'>
          {actionType ? actionType.replaceAll('_', ' ') : ''}
        </Typography>
        {chequeId && (
          <Formik
            onSubmit={async (values, actions) => handleSubmit(values, actions)}
            enableReinitialize
            initialValues={getInitialValues(isPersonal, actionType, chequeId)}
            validationSchema={getSchema(isPersonal, actionType)}>
            {({ setFieldValue }) => (
              <StyledForm>
                <Grid container direction='column' gap={2}>
                  {getActionComponents(setFieldValue)}
                </Grid>

                <Grid container justify='space-between'>
                  <Grid item xs={5}>
                    <StyledButton
                      onClick={() => onClose()}
                      variant='contained'
                      fullWidth
                      disabled={loading}
                      color='error'>
                      Close
                    </StyledButton>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5}>
                    <StyledButton
                      loading={loading}
                      type='submit'
                      variant='contained'
                      fullWidth>
                      {actionType ? actionType.replaceAll('_', ' ') : ''}
                    </StyledButton>
                  </Grid>
                </Grid>
              </StyledForm>
            )}
          </Formik>
        )}
      </StyledPaper>
    </Modal>
  );
};

export default withSnackbar(ChequeActions);
