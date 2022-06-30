import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

import Heading from '../../components/Heading';
import ViewWrapper from '../../components/ViewWrapper';
import LedgerEntryForm from './LedgerEntryForm';

import { withSnackbar } from '../../hoc/withSnackbar';

import { getPersonOptions, formatDataBeforePosting } from './utils';
import { ledgerApi } from './api';

import { findErrorMessage } from '../../utilities/objectUtils';

const LedgerEntry = ({
  isEdit,
  editData,
  role,
  showErrorSnackbar,
  showSuccessSnackbar,
  handleCancelEditing,
}) => {
  const essentials = useSelector((state) => state.essentials);
  const [isLoading, setIsLoading] = useState(false);

  let personOptions = useMemo(
    () => getPersonOptions(essentials, role),
    [essentials, role]
  );

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    let data = formatDataBeforePosting(values);
    ledgerApi(data, editData?.ledger_detail_id, isEdit)
      .then((response) => {
        actions.resetForm();
        showSuccessSnackbar(
          isEdit ? 'Ledger entry edited' : 'Ledger entry created'
        );
        if (isEdit) {
          handleCancelEditing();
        }
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  return (
    <>
      <Heading heading='Ledger Entry' />
      <Grid container direction='column' gap={2}>
        {isEdit && (
          <Grid item xs={4}>
            <Button
              onClick={handleCancelEditing}
              variant='contained'
              color='error'>
              Cancel Editing
            </Button>
          </Grid>
        )}
        <ViewWrapper>
          <LedgerEntryForm
            isEdit={isEdit}
            editData={editData}
            personOptions={personOptions}
            accountTypes={essentials.accountTypes}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </ViewWrapper>
      </Grid>
    </>
  );
};

export default withSnackbar(LedgerEntry);
