import React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import { FastField } from 'formik';
import { FieldArray } from 'formik';

import { Grid } from '@mui/material';
import { TextField } from '@mui/material';

import AddRemove from '../../../components/AddRemove';
import CustomLoader from '../../../components/CustomLoader';
import ViewWrapper from '../../../components/ViewWrapper';
import Total from '../common/Total';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';
import { FormSwitchField } from '../../../utilities/formUtils';

import * as api from './api';
import * as constants from './constants';
import * as utils from './utils';
import { schema } from './validation';

import * as commonUtils from '../common/utils';
import { LotNumber } from '../common/styled';

import { DetailWrapper } from './styled';
import { StyledButton } from './styled';
import { LotHeader } from './styled';
import { LotWrapper } from './styled';
import { MetaWrapper } from './styled';
import { UniqueError } from './styled';

import { LotTotalWrapper } from '../common/styled';

import { getAllDying } from '../../../../store/dying';
import { getAllFormulas, getAllProduct } from '../../../../store/raw';

import { findErrorMessage } from '../../../utilities/objectUtils';

import { withSnackbar } from '../../../hoc/withSnackbar';

const RawPurchase = ({ showErrorSnackbar, showSuccessSnackbar }) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const raw = useSelector((state) => state.raw);
  const dying = useSelector((state) => state.dying);

  const [isLoading, setIsLoading] = useState(false);

  // fetch formulas, dying and products in beginning if not fetched already
  useEffect(() => {
    if (!raw.formulasInfo.fetched) {
      dispatch(getAllFormulas());
    }
    if (!dying.fetched) {
      dispatch(getAllDying());
    }
    if (!raw.productsInfo.fetched) {
      dispatch(getAllProduct());
    }
  }, []);

  const metaFields = useMemo(
    () => utils.getMetaFields(essentials),
    [essentials]
  );

  const FIELD_MAP = {
    [constants.FIELD_TYPES.NUMBER]: FormTextField,
    [constants.FIELD_TYPES.STRING]: FormTextField,
    [constants.FIELD_TYPES.SELECT]: FormAutoCompleteField,
    [constants.FIELD_TYPES.DATE]: FormDateField,
    [constants.FIELD_TYPES.SWITCH]: FormSwitchField,
  };

  const getFieldProps = (field, errors, touched) => ({
    component: FIELD_MAP[field.type],
    options: field.options,
    name: field.field,
    type: field.type,
    size: 'small',
    label: field.label,
    fullWidth: true,
    isError: !!errors[field.field] && touched[field.field],
    errorText: errors[field.field],
    onCheckedLabel: field.onCheckedLabel ?? null,
  });

  const handleSubmit = (values, actions) => {
    let { isValid, error } = utils.isFormValid(values);
    console.log(isValid, error);
    if (isValid) {
      let data = utils.formatBeforeSubmit(values);
      setIsLoading(true);
      api
        .createTransactionApi(data)
        .then((response) => {
          setIsLoading(false);
          actions.resetForm();
          showSuccessSnackbar('Transaction created');
        })
        .catch((error) => {
          setIsLoading(false);
          showErrorSnackbar(findErrorMessage(error.response.data));
        });
    } else {
      showErrorSnackbar(error);
    }
  };

  return (
    <>
      {raw.formulasInfo.fetched && dying.fetched && raw.productsInfo.fetched ? (
        <ViewWrapper marginBottom={4} heading='Kora Purchase' width={80}>
          <Formik
            initialValues={constants.INITIAL_VALUES}
            validationSchema={schema}
            onSubmit={(values, actions) => handleSubmit(values, actions)}>
            {({ values, errors, touched, handleSubmit }) => (
              <Form>
                <MetaWrapper gap={2} container justifyContent='space-between'>
                  {metaFields.map((field, index) => (
                    <Grid key={index} item xs={5}>
                      <FastField {...getFieldProps(field, errors, touched)} />
                    </Grid>
                  ))}
                </MetaWrapper>
                <FieldArray
                  name={constants.FIELDS.lots}
                  render={(arrayHelpersLot) =>
                    values.lots &&
                    values.lots.map((lot, lotIndex) => (
                      <LotWrapper
                        error={
                          typeof errors.lots?.[lotIndex]?.lot_detail ===
                          'string'
                        }
                        container
                        direction='column'
                        gap={3}
                        key={`lot-${lotIndex}`}>
                        <LotHeader container justifyContent='space-between'>
                          <Grid item xs={10}>
                            <Grid container alignItems='center'>
                              <Grid item xs={2}>
                                <LotNumber
                                  variant='h5'
                                  iserror={
                                    typeof errors.lots?.[lotIndex]
                                      ?.lot_detail === 'string'
                                  }>
                                  Lot # {lotIndex + 1}
                                </LotNumber>
                              </Grid>
                              {utils
                                .getLotHeadField(
                                  values.person,
                                  lotIndex,
                                  values.lots[lotIndex].issued,
                                  dying.dyingUnits,
                                  raw.productsInfo.products
                                )
                                .map(
                                  (field, lotFieldIndex) =>
                                    field.render && (
                                      <Grid
                                        key={`lotHeader-${lotFieldIndex}`}
                                        item
                                        xs={3}>
                                        {field.isFast ? (
                                          <FastField
                                            {...getFieldProps(
                                              field,
                                              errors,
                                              touched
                                            )}
                                            isError={
                                              !!errors.lots?.[lotIndex]?.[
                                                field.name
                                              ] &&
                                              touched.lots?.[lotIndex]?.[
                                                field.name
                                              ]
                                            }
                                            errorText={
                                              errors.lots?.[lotIndex]?.[
                                                field.name
                                              ]
                                            }
                                          />
                                        ) : (
                                          <Field
                                            {...getFieldProps(
                                              field,
                                              errors,
                                              touched
                                            )}
                                            isError={
                                              !!errors.lots?.[lotIndex]?.[
                                                field.name
                                              ] &&
                                              touched.lots?.[lotIndex]?.[
                                                field.name
                                              ]
                                            }
                                            errorText={
                                              errors.lots?.[lotIndex]?.[
                                                field.name
                                              ]
                                            }
                                          />
                                        )}
                                      </Grid>
                                    )
                                )}
                            </Grid>
                          </Grid>

                          <Grid item xs={1}>
                            <AddRemove
                              disabled={values.lots.length === 1}
                              onAdd={() =>
                                arrayHelpersLot.push(
                                  constants.INITIAL_VALUES.lots[0]
                                )
                              }
                              onDelete={() => arrayHelpersLot.remove(lotIndex)}
                              addColor='secondary'
                            />
                          </Grid>
                        </LotHeader>
                        <DetailWrapper container direction='column' gap={1}>
                          <FieldArray
                            name={`${constants.FIELDS.lots}.${lotIndex}.${constants.FIELDS.lot_detail}`}
                            render={(arrayHelpersLotDetail) =>
                              values.lots[lotIndex]?.lot_detail &&
                              values.lots[lotIndex].lot_detail.map(
                                (lotDetail, index) => (
                                  <Grid
                                    key={`lotDetail-${lotIndex}-${index}-wrapper`}
                                    container
                                    justifyContent='space-between'>
                                    {utils
                                      .getLotDetailFields(
                                        essentials,
                                        lotIndex,
                                        index,
                                        raw.formulasInfo.formulas
                                      )
                                      .map((lotDetailField, lotDetailIndex) => {
                                        return !values.lots[lotIndex]?.issued ||
                                          lotDetailField.name !==
                                            'warehouse' ? (
                                          <Grid
                                            key={`lotDetail-${lotIndex}-${lotDetailIndex}-item`}
                                            item
                                            xs={lotDetailField.xs || 1}>
                                            <FastField
                                              {...getFieldProps(
                                                lotDetailField,
                                                errors,
                                                touched
                                              )}
                                              isError={
                                                !!errors.lots?.[lotIndex]
                                                  ?.lot_detail?.[index]?.[
                                                  lotDetailField.name
                                                ] &&
                                                touched.lots?.[lotIndex]
                                                  ?.lot_detail?.[index]?.[
                                                  lotDetailField.name
                                                ]
                                              }
                                              errorText={
                                                errors.lots?.[lotIndex]
                                                  ?.lot_detail?.[index]?.[
                                                  lotDetailField.name
                                                ]
                                              }
                                              variant='standard'
                                            />
                                          </Grid>
                                        ) : null;
                                      })}
                                    {commonUtils
                                      .getCalculatedValues(
                                        values,
                                        lotIndex,
                                        index
                                      )
                                      .map((calculated, calIndex) => (
                                        <Grid key={calIndex} item xs={1}>
                                          <TextField
                                            disabled
                                            key={calIndex}
                                            label={calculated.label}
                                            size='small'
                                            variant='standard'
                                            value={calculated.value.toFixed(2)}
                                          />
                                        </Grid>
                                      ))}
                                    <Grid item xs={1}>
                                      <AddRemove
                                        disabled={
                                          values.lots[lotIndex].lot_detail
                                            .length === 1
                                        }
                                        onAdd={() =>
                                          arrayHelpersLotDetail.push({
                                            ...constants.LOT_DETAIL_INITIAL,
                                            formula:
                                              values.lots[lotIndex].lot_detail[
                                                index
                                              ].formula,
                                          })
                                        }
                                        onDelete={() =>
                                          arrayHelpersLotDetail.remove(index)
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                )
                              )
                            }
                          />
                          {typeof errors.lots?.[lotIndex]?.lot_detail ===
                            'string' && (
                            <UniqueError color='error' variant='caption'>
                              Lot detail must be unique
                            </UniqueError>
                          )}

                          <LotTotalWrapper container>
                            {commonUtils
                              .getTotals(values.lots[lotIndex].lot_detail)
                              .map((text, textIndex) => (
                                <Total
                                  text={text}
                                  index={`${textIndex}-inner`}
                                />
                              ))}
                          </LotTotalWrapper>
                        </DetailWrapper>
                      </LotWrapper>
                    ))
                  }
                />
                <Grid container>
                  {commonUtils
                    .getTotals(values, true)
                    .map((text, textIndex) => (
                      <Total
                        key={`${textIndex}-bottom`}
                        text={text}
                        index={textIndex}
                        variant='body2'
                      />
                    ))}
                </Grid>
                <StyledButton
                  fullWidth
                  onClick={handleSubmit}
                  variant='contained'
                  loading={isLoading}>
                  Post
                </StyledButton>
              </Form>
            )}
          </Formik>
        </ViewWrapper>
      ) : (
        <CustomLoader pageLoader loading={true} />
      )}
    </>
  );
};

export default withSnackbar(RawPurchase);
