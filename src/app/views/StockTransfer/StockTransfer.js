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
import { findErrorMessage } from '../../utilities/objectUtils';

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
      transfer_detail: values.transfer_detail.map((detail) => ({
        product: detail.product.value,
        yards_per_piece: detail.yards_per_piece,
        to_warehouse: detail.to_warehouse.value,
        from_warehouse: detail.from_warehouse.value,
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

  return (
    <ViewWrapper>
      <Heading heading='Transfer Stock' />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, actions) => submit(values, actions)}>
        {({ values, errors, touched, handleSubmit }) => (
          <Form>
            <MetaWrapper container>
              <Grid item xs={5}>
                <FastField
                  size='small'
                  component={FormDateField}
                  name='date'
                  label='Date'
                  isError={touched['date'] && !!errors['date']}
                  errorText={touched['date'] ? errors['date'] : ''}
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
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default withSnackbar(StockTransfer);
