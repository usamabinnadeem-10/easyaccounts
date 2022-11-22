import React from 'react';
import { useState } from 'react';

import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

export const withSnackbar = (Component) => {
  return (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('...');
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState('success');

    const showSnackbar = (message, severity = 'success', duration = 3000) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const showSuccessSnackbar = (message) => {
      showSnackbar(message);
    };

    const showErrorSnackbar = (message) => {
      showSnackbar(message, 'error');
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <Component
          {...props}
          showSuccessSnackbar={showSuccessSnackbar}
          showErrorSnackbar={showErrorSnackbar}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}>
          <Alert variant='filled' onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};
