import React from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';

import { Button } from '@mui/material';

import ViewWrapper from '../../components/ViewWrapper';
import Heading from '../../components/Heading';
import TransferDrawer from '../../components/TransferDrawer';
import StockTransferForm from './StockTransferForm';

import { INITIAL_VALUES } from './constants';
import { schema } from './validation';
import { transferStockApi } from './api';

import { getAllStock } from '.././../../store/transactions';
import { findErrorMessage, isObjectDirty } from '../../utilities/objectUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

const StockTransfer = ({
  showErrorSnackbar,
  showSuccessSnackbar,
  products,
  warehouses,
  editData,
  editId,
  handleCancelEdit,
}) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const [isLoading, setIsLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTransfer, setCurrentTransfer] = useState(null);

  const submit = (values, actions) => {
    setIsLoading(true);
    let data = {};
    if (values.date !== '') {
      data.date = values.date;
    }
    data = {
      ...data,
      from_warehouse: values.from_warehouse.value,
      manual_serial: values.manual_serial,
      transfer_detail: values.transfer_detail.map((detail) => ({
        product: detail.product.value,
        yards_per_piece: detail.yards_per_piece,
        to_warehouse: detail.to_warehouse.value,
        quantity: detail.quantity,
      })),
    };
    transferStockApi(data, editId)
      .then((response) => {
        showSuccessSnackbar('Transferred successfully');
        setShowDrawer(true);
        setCurrentTransfer(response.data);
        setIsLoading(false);
        dispatch(getAllStock());
        actions.resetForm();
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        setIsLoading(false);
        setCurrentTransfer(null);
      });
  };

  const addScannerDataToForm = (data, values, setFieldValue) => {
    let detail = values.transfer_detail;
    let index = detail.findIndex(
      (t) =>
        t.product.value === data.product.value &&
        t.yards_per_piece === data.yards_per_piece.value
    );
    if (index >= 0) {
      setFieldValue(
        `transfer_detail.${index}.quantity`,
        detail[index].quantity + 1
      );
    } else {
      let lastIndex = detail.length - 1;
      let newRow = {
        ...data,
        to_warehouse: detail[lastIndex].to_warehouse,
        yards_per_piece: data.yards_per_piece.value,
        quantity: 1,
      };
      lastIndex =
        !isObjectDirty(detail[lastIndex]) && lastIndex === 0
          ? 0
          : lastIndex + 1;
      setFieldValue(`transfer_detail.${lastIndex}`, newRow);
    }
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setCurrentTransfer(null);
    if (editData && editId) {
      handleCancelEdit();
    }
  };

  return (
    <ViewWrapper>
      {editData && editId && (
        <Button
          size='small'
          sx={{ mb: 2 }}
          onClick={handleCancelEdit}
          variant='contained'
          color='error'>
          Go back
        </Button>
      )}

      {currentTransfer && (
        <TransferDrawer
          open={showDrawer}
          onClose={handleCloseDrawer}
          data={currentTransfer}
          products={products}
          warehouses={warehouses}
        />
      )}
      <Heading heading='Transfer Stock' />
      <Formik
        enableReinitialize
        initialValues={editData || INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) => submit(values, actions)}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <StockTransferForm
            values={values}
            touched={touched}
            errors={errors}
            essentials={essentials}
            setFieldValue={setFieldValue}
            handleSubmit={handleSubmit}
            addScannerDataToForm={addScannerDataToForm}
            isLoading={isLoading}
            isEdit={editData && editId}
          />
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default withSnackbar(StockTransfer);
