import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { FastField } from 'formik';
import { FieldArray } from 'formik';

import AddRemove from '../../components/AddRemove';
import ViewWrapper from '../../components/ViewWrapper';
import Heading from '../../components/Heading';
import CustomLoader from '../../components/CustomLoader';

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
import { formatStock } from './utils';
import { transferStockApi } from './api';

import { getAllStock } from '.././../../store/transactions';
import { findErrorMessage } from '../../utilities/objectUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

const StockTransfer = ({
  products,
  warehouses,
  showErrorSnackbar,
  showSuccessSnackbar,
}) => {
  const dispatch = useDispatch();
  const stockStore = useSelector((state) => state.transactions);
  const warehouseOptions = useSelector((state) => state.essentials.warehouses);
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (stockStore.shouldFetchStock) {
      dispatch(getAllStock());
    }
    if (stockStore.allStock.length > 0) {
      setStock(formatStock(stockStore.allStock, products, warehouses));
    }
  }, [stockStore]);

  const submit = (values) => {
    setIsLoading(true);
    let data = {};
    if (values.date !== '') {
      data.date = values.date;
    }
    data = {
      ...data,
      transfer_detail: values.transfer_detail.map((detail) => ({
        stock_id: detail.stock_id.id,
        to_warehouse: detail.to_warehouse.value,
        quantity: detail.quantity,
      })),
    };
    transferStockApi(data)
      .then((response) => {
        showSuccessSnackbar('Transferred successfully');
        setIsLoading(false);
        dispatch(getAllStock());
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        setIsLoading(false);
      });
  };

  return (
    <ViewWrapper>
      {stockStore.fetched ? (
        <>
          <Heading heading='Transfer Stock' />
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={schema}
            onSubmit={(values, actions) => submit(values)}>
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
                          <Grid item xs={5}>
                            <Field
                              size='small'
                              component={FormAutoCompleteField}
                              options={stock}
                              name={`transfer_detail.${rowIndex}.stock_id`}
                              label='Stock'
                              isError={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'stock_id'
                                ] &&
                                !!errors?.transfer_detail?.[rowIndex]?.[
                                  'stock_id'
                                ]
                              }
                              errorText={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'stock_id'
                                ]
                                  ? errors.transfer_detail?.[rowIndex]?.[
                                      'stock_id'
                                    ]
                                  : ''
                              }
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FastField
                              size='small'
                              component={FormAutoCompleteField}
                              options={warehouseOptions}
                              name={`transfer_detail.${rowIndex}.to_warehouse`}
                              label='Transfer Warehouse'
                              isError={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'to_warehouse'
                                ] &&
                                !!errors?.transfer_detail?.[rowIndex]?.[
                                  'to_warehouse'
                                ]
                              }
                              errorText={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'to_warehouse'
                                ]
                                  ? errors.transfer_detail?.[rowIndex]?.[
                                      'to_warehouse'
                                    ]
                                  : ''
                              }
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <FastField
                              size='small'
                              type='number'
                              component={FormTextField}
                              options={stock}
                              name={`transfer_detail.${rowIndex}.quantity`}
                              label='Quantity'
                              isError={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'quantity'
                                ] &&
                                !!errors?.transfer_detail?.[rowIndex]?.[
                                  'quantity'
                                ]
                              }
                              errorText={
                                touched.transfer_detail?.[rowIndex]?.[
                                  'quantity'
                                ]
                                  ? errors.transfer_detail?.[rowIndex]?.[
                                      'quantity'
                                    ]
                                  : ''
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <AddRemove
                              disabled={values.transfer_detail.length === 1}
                              onDelete={() => arrayHelpers.remove(rowIndex)}
                              onAdd={() =>
                                arrayHelpers.push(
                                  INITIAL_VALUES.transfer_detail[0]
                                )
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
        </>
      ) : (
        <CustomLoader pageLoader />
      )}
    </ViewWrapper>
  );
};

export default withSnackbar(StockTransfer);
