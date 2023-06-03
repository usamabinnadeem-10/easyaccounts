import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import { Field } from 'formik';
import { FastField } from 'formik';
import { FieldArray } from 'formik';

import AddRemove from '../../components/AddRemove';
import CustomLoader from '../CustomLoader';

import { ErrorAwareGrid, TransactionRow, Badge } from './styled';

import {
  FormAutoCompleteField,
  FormTextField,
} from '../../utilities/formUtils';

import { getAllStock } from '../../../store/transactions';
import { isObjectDirty } from '../../utilities/objectUtils';

const TransactionBody = ({
  values,
  errors,
  touched,
  transactionTypes,
  warehouses,
  transaction,
  scannerValue,
  setFieldValue,
  setScannerValue,
  duplicates,
  showErrorSnackbar,
  resetDuplicates,
}) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const stock = useSelector((state) => state.transactions);

  const [validate, setValidate] = useState(true);
  // const [uniqueError, setUniqueError] = useState(false);
  const [duplicateRowsColors, setDuplicateRowsColors] = useState(null);

  // useEffect(() => {
  //   if (
  //     errors?.transaction_detail &&
  //     typeof errors.transaction_detail === "string"
  //   ) {
  //     setUniqueError(true);
  //   } else {
  //     setUniqueError(false);
  //   }
  // }, [errors]);

  // check if the given row has any filled data
  const isFormikRowDirty = (rowIndex) => {
    let obj = values.transaction_detail[rowIndex];
    return isObjectDirty(obj);
  };

  const addScannedValueToForm = (value) => {
    let detail = values.transaction_detail;
    // find matching value in formik values
    let index = detail.findIndex(
      (row) =>
        row.product.value === value.product.value &&
        row.yards_per_piece.value === value.yards_per_piece.value,
    );
    // if index is matched, then add to quantity
    if (index >= 0) {
      setFieldValue(
        `transaction_detail.${index}.quantity`,
        detail[index].quantity + 1,
      );
    }
    // if index is not matches, then add a new row
    else {
      let lastIndex = detail.length - 1;
      let newRow = {
        ...value,
        warehouse: detail[lastIndex].warehouse,
        rate: detail[lastIndex].rate,
        quantity: 1,
      };
      if (transaction) {
        newRow['new'] = true;
      }
      lastIndex =
        !isFormikRowDirty(lastIndex) && lastIndex === 0 ? 0 : lastIndex + 1;
      setFieldValue(`transaction_detail.${lastIndex}`, newRow);
    }
  };

  // listen to scanner value and then add to Formik
  // after adding, set scanner value to null
  useEffect(() => {
    if (scannerValue) {
      addScannedValueToForm(scannerValue);
      setScannerValue(null);
    }
  }, [scannerValue]);

  useEffect(() => {
    setValidate(
      transactionTypes.filter((type) => type.value === values.type)[0]
        ?.validate,
    );
  }, [values.type, transactionTypes]);

  useEffect(() => {
    if (stock.shouldFetchStock) {
      dispatch(getAllStock());
    }
  }, [stock.shouldFetchStock]);

  // listen to duplicates variable and set colors of the rows of transaction
  useEffect(() => {
    if (!duplicates) {
      setDuplicateRowsColors(null);
    } else {
      let arr = values.transaction_detail.map((row) => '');
      duplicates.forEach((d) => {
        let color =
          '#' +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        d.forEach((idx) => {
          arr[idx] = color;
        });
      });
      setDuplicateRowsColors(arr);
      showErrorSnackbar('Please remove duplicates');
    }
  }, [duplicates]);

  // returns the object of the row index passed from formik
  const getCurrentRowData = (rowIndex) => {
    return {
      product: values.transaction_detail?.[rowIndex].product,
      gazaana: values.transaction_detail?.[rowIndex].yards_per_piece,
      warehouse: values.transaction_detail?.[rowIndex].warehouse,
    };
  };

  // gazaana options for each row
  const getGazaanaOptions = (rowIndex) => {
    let { product } = getCurrentRowData(rowIndex);
    if (product?.value) {
      let options = stock.allStock.filter(
        (s) => s.product === product?.value && s.quantity > 0,
      );
      return [
        ...new Map(
          options.map((obj) => [`${obj.product}:${obj.yards_per_piece}`, obj]),
        ).values(),
      ].map((val) => ({
        value: val.yards_per_piece,
        label: `${val.yards_per_piece}`,
      }));
    }
    return [];
  };

  // gazaana options for each row
  const getWarehouseOptions = (rowIndex) => {
    let { product, gazaana } = getCurrentRowData(rowIndex);
    if (product?.value) {
      let options = stock.allStock.filter(
        (s) =>
          s.product === product?.value &&
          s.yards_per_piece === gazaana?.value &&
          s.quantity > 0,
      );
      return [
        ...new Map(
          options.map((obj) => [
            `${obj.product}:${obj.yards_per_piece}:${obj.warehouse}`,
            obj,
          ]),
        ).values(),
      ].map((val) => ({
        value: val.warehouse,
        label: warehouses[val.warehouse].label,
      }));
    }
    return [];
  };

  // gazana and amount for current row
  const getRowTotals = (rowIndex) => {
    let row = values.transaction_detail?.[rowIndex];
    let gazaana =
      parseFloat(row.yards_per_piece.value) * parseFloat(row.quantity) || 0;
    let amount = gazaana * parseFloat(row.rate) || 0;
    return [
      {
        label: 'gaz',
        value: gazaana,
      },
      {
        label: '/=',
        value: amount,
      },
    ];
  };

  // return errors of a field inside array (Formik)
  const getFieldErrors = (rowIndex, field) => ({
    isError:
      !!errors.transaction_detail?.[rowIndex]?.[field] &&
      touched.transaction_detail?.[rowIndex]?.[field],
    errorText: errors.transaction_detail?.[rowIndex]?.[field],
  });

  // get stock quantity for the current selected product, warehouse and gazaana
  const getStockQuantity = (rowIndex) => {
    let { product, gazaana, warehouse } = getCurrentRowData(rowIndex);
    let qty = stock.allStock.filter(
      (s) =>
        s.product === product?.value &&
        s.yards_per_piece === gazaana?.value &&
        s.warehouse === warehouse?.value,
    );
    if (qty.length) {
      return qty[0].quantity;
    }
    return 0;
  };

  // add new row helper
  const getNewRow = (rowIndex) => {
    let data = values.transaction_detail[rowIndex];
    // if (transaction) {
    //   data = { ...data, id: null, new: true };
    // }
    let { product, ...rest } = data;
    return { product, ...rest };
  };

  return (
    <>
      {stock.shouldFetchStock ? (
        <Grid container justifyContent="center">
          <CustomLoader loading={true} />
        </Grid>
      ) : (
        <>
          <ErrorAwareGrid iserror={duplicates}>
            <FieldArray
              name="transaction_detail"
              render={(arrayHelpers) =>
                values.transaction_detail.map((row, rowIndex) => (
                  <Grid key={rowIndex} container>
                    <Grid item xs={10}>
                      <TransactionRow container>
                        <Badge
                          duplicatecolor={
                            duplicateRowsColors
                              ? duplicateRowsColors[rowIndex]
                              : null
                          }
                        />
                        <Grid item xs={3}>
                          <FastField
                            name={`transaction_detail.${rowIndex}.product`}
                            component={FormAutoCompleteField}
                            options={essentials.products}
                            label="Product"
                            variant="standard"
                            {...getFieldErrors(rowIndex, 'product')}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            name={`transaction_detail.${rowIndex}.yards_per_piece`}
                            component={FormAutoCompleteField}
                            // component={FormTextField}
                            freeSolo={true}
                            options={getGazaanaOptions(rowIndex)}
                            label="Gazaana"
                            variant="standard"
                            type="number"
                            {...getFieldErrors(rowIndex, 'yards_per_piece')}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Field
                            name={`transaction_detail.${rowIndex}.warehouse`}
                            component={FormAutoCompleteField}
                            options={
                              validate
                                ? getWarehouseOptions(rowIndex)
                                : essentials.warehouses
                            }
                            label="Warehouse"
                            variant="standard"
                            {...getFieldErrors(rowIndex, 'warehouse')}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <FastField
                            name={`transaction_detail.${rowIndex}.rate`}
                            component={FormTextField}
                            label="Rate"
                            variant="standard"
                            size="small"
                            type="number"
                            {...getFieldErrors(rowIndex, 'rate')}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Field
                            name={`transaction_detail.${rowIndex}.quantity`}
                            component={FormTextField}
                            variant="standard"
                            size="small"
                            type="number"
                            // label='Quantity'
                            label={`Qty: ${getStockQuantity(rowIndex)} thaan`}
                            {...getFieldErrors(rowIndex, 'quantity')}
                          />
                        </Grid>
                        <Grid
                          sx={{ display: 'flex', alignItems: 'center' }}
                          item
                          xs={4}
                        >
                          <Grid container alignItems="center">
                            {getRowTotals(rowIndex).map((total, totalIndex) => (
                              <Grid sx={{ textAlign: 'center' }} item xs={6}>
                                <Typography variant="body1">
                                  {total.value} {total.label}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </TransactionRow>
                    </Grid>

                    <Grid item xs={2}>
                      <AddRemove
                        disabled={values.transaction_detail.length === 1}
                        onAdd={() => {
                          arrayHelpers.push(getNewRow(rowIndex));
                          resetDuplicates();
                        }}
                        onDelete={() => {
                          arrayHelpers.remove(rowIndex);
                          resetDuplicates();
                        }}
                      />
                    </Grid>
                  </Grid>
                ))
              }
            />
          </ErrorAwareGrid>
          {/* {uniqueError && (
            <Typography sx={{ mt: 2 }} variant="body2" color="error">
              Please use unique entries
            </Typography>
          )} */}
        </>
      )}
    </>
  );
};

export default TransactionBody;
