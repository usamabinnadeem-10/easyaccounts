import React from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { FastField } from 'formik';
import { FieldArray } from 'formik';

import AddRemove from '../../components/AddRemove';
import ViewWrapper from '../../components/ViewWrapper';
import Heading from '../../components/Heading';
import ScannerInput from '../../components/ScannerInput';

import { FormAutoCompleteField } from '../../utilities/formUtils';
import { FormDateField } from '../../utilities/formUtils';
import { FormTextField } from '../../utilities/formUtils';

import { Grid } from '@mui/material';

import { Error } from './styled';
import { MetaWrapper } from './styled';
import { RowWrapper } from './styled';
import { StyledButton } from './styled';

import { INITIAL_VALUES } from './constants';
import { schema } from './validation';
import { getRowFields } from './utils';
import { transferStockApi } from './api';

import { getAllStock } from '.././../../store/transactions';
import { findErrorMessage, isObjectDirty } from '../../utilities/objectUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

const StockTransfer = ({ showErrorSnackbar, showSuccessSnackbar }) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const [isLoading, setIsLoading] = useState(false);

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
    transferStockApi(data)
      .then((response) => {
        showSuccessSnackbar('Transferred successfully');
        setIsLoading(false);
        dispatch(getAllStock());
        actions.resetForm();
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        setIsLoading(false);
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

  return (
    <ViewWrapper>
      <Heading heading='Transfer Stock' />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) => submit(values, actions)}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form>
            <MetaWrapper container justifyContent='space-between'>
              <Grid item xs={3}>
                <FastField
                  size='small'
                  component={FormDateField}
                  name='date'
                  label='Date'
                  isError={touched['date'] && !!errors['date']}
                  errorText={touched['date'] ? errors['date'] : ''}
                />
              </Grid>
              <Grid item xs={4}>
                <FastField
                  size='small'
                  component={FormAutoCompleteField}
                  options={essentials.warehouses}
                  name='from_warehouse'
                  label='From Warehouse'
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <FastField
                  size='small'
                  component={FormTextField}
                  name='manual_serial'
                  label='Receipt #'
                  fullWidth
                  type='number'
                />
              </Grid>
            </MetaWrapper>
            <Grid container direction='column'>
              <FieldArray
                name='transfer_detail'
                render={(arrayHelpers) =>
                  values.transfer_detail.map((row, rowIndex) => (
                    <RowWrapper
                      key={rowIndex}
                      container
                      justifyContent='space-between'>
                      {getRowFields(essentials).map(
                        (rowField, rowFieldIndex) => (
                          <Grid item xs={rowField.xs}>
                            <FastField
                              component={
                                rowField.component
                                  ? FormTextField
                                  : FormAutoCompleteField
                              }
                              options={rowField.options}
                              size='small'
                              variant='standard'
                              name={`transfer_detail.${rowIndex}.${rowField.name}`}
                              label={rowField.label}
                              isError={
                                touched.transfer_detail?.[rowIndex]?.[
                                  rowField.name
                                ] &&
                                !!errors?.transfer_detail?.[rowIndex]?.[
                                  rowField.name
                                ]
                              }
                              errorText={
                                touched.transfer_detail?.[rowIndex]?.[
                                  rowField.name
                                ]
                                  ? errors.transfer_detail?.[rowIndex]?.[
                                      rowField.name
                                    ]
                                  : ''
                              }
                            />
                          </Grid>
                        )
                      )}
                      <Grid item xs={2}>
                        <AddRemove
                          disabled={values.transfer_detail.length === 1}
                          onDelete={() => arrayHelpers.remove(rowIndex)}
                          onAdd={() =>
                            arrayHelpers.push({
                              ...values.transfer_detail[rowIndex],
                              yards_per_piece: '',
                            })
                          }
                        />
                      </Grid>
                    </RowWrapper>
                  ))
                }
              />
            </Grid>

            {typeof errors.transfer_detail === 'string' && (
              <Error color='error' variant='caption'>
                {errors.transfer_detail}
              </Error>
            )}

            <StyledButton
              loading={isLoading}
              onClick={handleSubmit}
              variant='contained'>
              Transfer
            </StyledButton>
            <ScannerInput
              getScannedValue={(val) =>
                addScannerDataToForm(val, values, setFieldValue)
              }
            />
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default withSnackbar(StockTransfer);
