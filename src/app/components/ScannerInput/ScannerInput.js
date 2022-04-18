import React from 'react';

import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';

import { FormTextField } from '../../utilities/formUtils';

import { Snackbar } from '@mui/material';

const ScannerInput = ({ getScannedValue, overrideValues }) => {
  const handleScannerInput = (val, actions) => {
    let decoded = null;
    try {
      decoded = JSON.parse(val.code);
    } catch (error) {
      actions.resetForm();
      return;
    }
    overrideValues &&
      overrideValues.forEach((value) => {
        decoded[value.key] = value.value;
      });
    getScannedValue(decoded);
    actions.resetForm();
  };

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <div>
        <Formik
          initialValues={{
            code: '',
          }}
          onSubmit={(values, actions) => {
            handleScannerInput(values, actions);
          }}>
          <Form>
            <Field
              component={FormTextField}
              sx={{
                '& .MuiFilledInput-root': {
                  borderRadius: '10px',
                },
                '& .MuiFilledInput-root:before': {
                  border: 0,
                },
                '& .MuiFilledInput-root:after': {
                  border: 0,
                },
                '& .MuiFilledInput-root:hover': {
                  border: 0,
                },
              }}
              autoFocus
              variant='filled'
              name='code'
              label='Scanner'
            />
          </Form>
        </Formik>
      </div>
    </Snackbar>
  );
};

export default ScannerInput;
