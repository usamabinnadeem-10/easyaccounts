import React from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { FastField } from 'formik';
import { Field } from 'formik';
import { FieldArray } from 'formik';

import AddRemove from '../../../components/AddRemove';
import CustomLoader from '../../../components/CustomLoader';
import Total from '../common/Total';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';
import { getErrors } from '../../../utilities/formUtils';

import { getAllFormulas } from '../../../../store/raw';

import { INITIAL, LOT_INITIAL } from './constants';
import { getFields, formatLotNumbers } from './utils';

import * as commonUtils from '../common/utils';
import { LotTotalWrapper } from '../common/styled';

import {
  LotContainer,
  LotHeaderContainer,
  LotNumber,
  LotDetailRow,
} from './styled';
import { listLotNumbers } from '../common/api';
import { withSnackbar } from '../../../hoc/withSnackbar';

const RawDetailForm = ({
  isTransfer = false,
  errors,
  touched,
  values,
  showErrorSnackbar,
}) => {
  const dispatch = useDispatch();
  const { formulas, fetched } = useSelector((state) => state.raw.formulasInfo);
  const essentials = useSelector((state) => state.essentials);
  const [lotNumbers, setLotNumbers] = useState([]);
  const [nextPageLotNumbers, setNextPageLotNumbers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLotNumbers = () => {
    setLoading(true);
    listLotNumbers()
      .then((response) => {
        setLotNumbers(formatLotNumbers(response.data.results));
        setNextPageLotNumbers(response.data.next);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showErrorSnackbar(
          'Could not load lot numbers, please try to refresh the page',
        );
      });
  };

  useEffect(() => {
    fetchLotNumbers();
  }, []);

  const fields = useMemo(() => {
    if (fetched) {
      let fields = getFields(essentials, formulas, isTransfer);
      return fields;
    }
    return [];
  }, [fetched]);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllFormulas());
    }
  }, [fetched]);

  return (
    <>
      {!fetched || loading ? (
        <CustomLoader loading={loading} />
      ) : (
        <FieldArray
          name="data"
          render={(arrayHelpers) =>
            values.data.map((lot, lotIndex) => (
              // lot container
              <LotContainer key={lotIndex} container direction="column">
                <LotHeaderContainer
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {/* Lot index and number */}
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={1}>
                        <LotNumber
                          iserror={typeof errors.data === 'string'}
                          variant="h4"
                        >
                          {lotIndex + 1}
                        </LotNumber>
                      </Grid>
                      <Grid item xs={nextPageLotNumbers ? 9 : 11}>
                        <Field
                          component={FormAutoCompleteField}
                          options={lotNumbers}
                          fullWidth
                          name={`data.${lotIndex}.lot_number`}
                          label="Lot number"
                          {...getErrors(
                            errors['data'],
                            touched['data'],
                            lotIndex,
                            'lot_number',
                            typeof errors.data === 'string',
                            'Duplicate lot number',
                          )}
                        />
                      </Grid>
                      {nextPageLotNumbers && (
                        <Grid item xs={2}>
                          <Button onClick={fetchLotNumbers}>Load more</Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {/* Add remove for the lot container */}
                  <Grid item xs={4}>
                    <AddRemove
                      disabled={values.data.length === 1}
                      onDelete={() => arrayHelpers.remove(lotIndex)}
                      onAdd={() => arrayHelpers.push(LOT_INITIAL)}
                    />
                  </Grid>
                </LotHeaderContainer>
                {/* lot detail container */}
                <FieldArray
                  name={`data.${lotIndex}.detail`}
                  render={(arrayHelpers) =>
                    values.data[lotIndex].detail.map(
                      (lotDetail, lotDetailIndex) => (
                        <Grid container justifyContent="space-between">
                          {/* Lot detail row */}
                          <LotDetailRow
                            iserror={
                              typeof errors?.data?.[lotIndex]?.detail ===
                              'string'
                            }
                            item
                            xs={11}
                          >
                            <Grid container justifyContent="space-between">
                              {fields.map((field, fieldIndex) => (
                                <Grid key={fieldIndex} item xs={field.xs}>
                                  <FastField
                                    component={
                                      field.type === 'select'
                                        ? FormAutoCompleteField
                                        : FormTextField
                                    }
                                    name={`data.${lotIndex}.detail.${lotDetailIndex}.${field.field}`}
                                    fullWidth
                                    label={field.label}
                                    variant="standard"
                                    {...getErrors(
                                      errors?.data?.[lotIndex]?.detail,
                                      touched?.data?.[lotIndex]?.detail,
                                      lotDetailIndex,
                                      field.field,
                                    )}
                                    options={field.options || []}
                                    type={field.type}
                                  />
                                </Grid>
                              ))}
                              {commonUtils
                                .getCalculatedValues(
                                  values,
                                  lotIndex,
                                  lotDetailIndex,
                                  'data',
                                  'detail',
                                  isTransfer,
                                )
                                .map((calculated, calIndex) => (
                                  <Grid key={calIndex} item xs={1}>
                                    <TextField
                                      disabled
                                      key={calIndex}
                                      label={calculated.label}
                                      size="small"
                                      variant="standard"
                                      value={calculated.value.toFixed(2)}
                                    />
                                  </Grid>
                                ))}
                            </Grid>
                          </LotDetailRow>
                          {/* AddDelete for rows of detail */}
                          <Grid item xs={1}>
                            <AddRemove
                              disabled={
                                values.data[lotIndex].detail.length === 1
                              }
                              onDelete={() =>
                                arrayHelpers.remove(lotDetailIndex)
                              }
                              onAdd={() =>
                                arrayHelpers.push(
                                  isTransfer
                                    ? INITIAL['transfer']
                                    : INITIAL['other'],
                                )
                              }
                            />
                          </Grid>
                        </Grid>
                      ),
                    )
                  }
                />
                {typeof errors?.data?.[lotIndex]?.detail === 'string' && (
                  <Typography color="error" variant="subtitle2">
                    Duplicate rows in detail
                  </Typography>
                )}
                <LotTotalWrapper>
                  {commonUtils
                    .getTotals(
                      values.data[lotIndex].detail,
                      false,
                      'data',
                      'detail',
                      isTransfer,
                    )
                    .map((text, textIndex) => (
                      <Total text={text} index={`${textIndex}-inner`} />
                    ))}
                </LotTotalWrapper>
              </LotContainer>
            ))
          }
        />
      )}
      <Grid container>
        {commonUtils
          .getTotals(values, true, 'data', 'detail', isTransfer)
          .map((text, textIndex) => (
            <Total
              key={`${textIndex}-bottom`}
              text={text}
              index={textIndex}
              variant="body2"
            />
          ))}
      </Grid>
    </>
  );
};

export default withSnackbar(RawDetailForm);
