import React from 'react';
import { useState } from 'react';

import { Button } from '@mui/material';

import ViewWrapper from '../../components/ViewWrapper';
import Heading from '../../components/Heading';

import AssetForm from './AssetForm';

import { createEditAssetApi } from './api';
import * as utils from './utils';

import { withSnackbar } from '../../hoc/withSnackbar';
import { findErrorMessage } from '../../utilities/objectUtils';

const CreateAsset = ({
  isEdit,
  editData,
  showErrorSnackbar,
  showSuccessSnackbar,
  onSubmit = null,
  assetId = null,
  handleCancelEditing,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setLoading(true);
    createEditAssetApi(utils.formatDataForPosting(values), assetId)
      .then((response) => {
        showSuccessSnackbar(isEdit ? 'Asset edited' : 'Asset created');
        onSubmit && onSubmit(response.data);
        setLoading(false);
        actions.resetForm();
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        setLoading(false);
      });
  };

  return (
    <>
      {isEdit && (
        <Button
          sx={{ mb: 2 }}
          onClick={handleCancelEditing}
          variant='contained'
          color='error'>
          Cancel Editing
        </Button>
      )}
      <ViewWrapper>
        <Heading heading={isEdit ? 'Edit Asset' : 'Add Asset'} />
        <AssetForm
          isEdit={isEdit}
          editData={editData ? utils.formatEditData(editData) : null}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </ViewWrapper>
    </>
  );
};

export default withSnackbar(CreateAsset);
