import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import CustomFilters from '../../containers/CustomFilters';
import Heading from '../../components/Heading';
import ViewWrapper from '../../components/ViewWrapper';

import AssetTable from './AssetTable';
import CreateAsset from '../Asset';

import { ASSET_APIS } from '../../../constants/restEndPoints';
import { FILTERS } from './filters';
import { deleteAssetApi } from './api';

import { withConfirmation } from '../../hoc/withConfirmation';

const AssetList = ({
  confirmed,
  confirmId,
  resetConfirmation,
  askForConfirmation,
}) => {
  const [assetData, setAssetData] = useState([]);
  const [currentAsset, setCurrentAsset] = useState({});
  const [total, setTotal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = (data) => {
    setAssetData(data);
    setTotal(data.reduce((prev, curr) => prev + curr.value, 0));
  };

  const handleSetEditedAsset = (data) => {
    let index = assetData.findIndex((a) => a.id === data.id);
    let newAssetData = [...assetData];
    newAssetData[index] = data;
    setAssetData(newAssetData);
    setIsEditing(false);
    setCurrentAsset(null);
  };

  const handleEditAsset = (assetId) => {
    setIsEditing(true);
    setCurrentAsset(assetData.filter((a) => a.id === assetId)[0]);
  };

  const confirmDeletion = (assetId) => {
    deleteAssetApi(assetId)
      .then((response) => {
        setAssetData(assetData.filter((a) => a.id !== assetId));
      })
      .then((response) => {
        resetConfirmation();
      });
  };

  const handleDeleteAsset = (assetId) => {
    askForConfirmation(assetId);
  };

  const handleCancelEditing = () => {
    console.log('hello');
    setIsEditing(false);
    setCurrentAsset(null);
  };

  useEffect(() => {
    if (confirmed && confirmId) {
      confirmDeletion(confirmId);
    }
  }, [confirmed, confirmId]);

  return (
    <>
      <Heading heading='Asset List' />
      {!isEditing && (
        <CustomFilters
          api={ASSET_APIS.LIST}
          filters={FILTERS}
          onSearch={handleSearch}
        />
      )}

      {assetData.length > 0 && !isEditing && (
        <AssetTable
          rows={assetData}
          handleDelete={handleDeleteAsset}
          handleEdit={handleEditAsset}
        />
      )}

      {isEditing && (
        <CreateAsset
          isEdit={true}
          editData={currentAsset}
          onSubmit={(val) => handleSetEditedAsset(val)}
          assetId={currentAsset.id}
          handleCancelEditing={handleCancelEditing}
        />
      )}
    </>
  );
};

export default withConfirmation(AssetList);
