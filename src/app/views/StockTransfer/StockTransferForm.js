import React from 'react';

import { Form } from 'formik';
import { FastField } from 'formik';
import { FieldArray } from 'formik';

import { Grid } from '@mui/material';

import AddRemove from '../../components/AddRemove';
import ScannerInput from '../../components/ScannerInput';

import { FormAutoCompleteField } from '../../utilities/formUtils';
import { FormDateField } from '../../utilities/formUtils';
import { FormTextField } from '../../utilities/formUtils';

import { MetaWrapper } from './styled';
import { Error } from './styled';
import { RowWrapper } from './styled';
import { StyledButton } from './styled';
import { ErrorAwareGrid } from './styled';

import { getRowFields } from './utils';

const StockTransferForm = ({
  values,
  touched,
  errors,
  essentials,
  setFieldValue,
  handleSubmit,
  addScannerDataToForm,
  isLoading,
  isEdit,
}) => {
  // add new row helper
  const getNewRow = (rowIndex) => {
    let data = values.transfer_detail[rowIndex];
    // if (transaction) {
    //   data = { ...data, id: null, new: true };
    // }
    let { product, ...rest } = data;
    return rest;
  };

  return (
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
      <ErrorAwareGrid
        iserror={typeof errors.transfer_detail === 'string'}
        container
        direction='column'>
        <FieldArray
          name='transfer_detail'
          render={(arrayHelpers) =>
            values.transfer_detail.map((row, rowIndex) => (
              <RowWrapper
                key={rowIndex}
                container
                justifyContent='space-between'>
                {getRowFields(essentials).map((rowField, rowFieldIndex) => (
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
                        touched.transfer_detail?.[rowIndex]?.[rowField.name] &&
                        !!errors?.transfer_detail?.[rowIndex]?.[rowField.name]
                      }
                      errorText={
                        touched.transfer_detail?.[rowIndex]?.[rowField.name]
                          ? errors.transfer_detail?.[rowIndex]?.[rowField.name]
                          : ''
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={2}>
                  <AddRemove
                    disabled={values.transfer_detail.length === 1}
                    onDelete={() => arrayHelpers.remove(rowIndex)}
                    onAdd={() => arrayHelpers.push(getNewRow(rowIndex))}
                  />
                </Grid>
              </RowWrapper>
            ))
          }
        />
      </ErrorAwareGrid>

      {typeof errors.transfer_detail === 'string' && (
        <Error color='error' variant='caption'>
          {errors.transfer_detail}
        </Error>
      )}

      <StyledButton
        loading={isLoading}
        onClick={handleSubmit}
        variant='contained'>
        {isEdit ? 'Edit' : 'Transfer'}
      </StyledButton>
      {/* <ScannerInput
        getScannedValue={(val) =>
          addScannerDataToForm(val, values, setFieldValue)
        }
      /> */}
    </Form>
  );
};

export default StockTransferForm;
