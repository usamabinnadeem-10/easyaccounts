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
import CustomToggleButtons from '../../../components/CustomToggleButtons';
import ViewWrapper from '../../../components/ViewWrapper';
import RawDetailForm from '../RawDetailForm';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormDateField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';
import { getErrors } from '../../../utilities/formUtils';

import {
  INITIAL_VALUES,
  RAW_DEBIT_TYPES,
  FIELDS,
  LOT_INITIAL,
  DETAIL_INITIAL,
} from './constants';
import { schema } from './validation';
import { MetaContainer } from './styled';

const RawDebit = () => {
  const essentials = useSelector((state) => state.essentials);

  return (
    <ViewWrapper marginBottom={4} heading='Kora Debit' width={80}>
      <Formik initialValues={INITIAL_VALUES} validationSchema={schema}>
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          handleSubmit,
        }) => (
          <Form>
            <Grid container direction='column' gap={3}>
              {/* Debit Meta column container */}
              <MetaContainer container direction='column' gap={2}>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormAutoCompleteField}
                      options={[
                        ...essentials.suppliers,
                        ...essentials.customers,
                      ]}
                      name={FIELDS.person}
                      label='Person'
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <CustomToggleButtons
                      buttons={RAW_DEBIT_TYPES}
                      getSelectedValue={(value) =>
                        setFieldValue(FIELDS.debit_type, value)
                      }
                      selectedValue={values[FIELDS.debit_type]}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormTextField}
                      name={FIELDS.manual_invoice_serial}
                      label='Book #'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FastField
                      component={FormDateField}
                      name={FIELDS.date}
                      label='Date'
                    />
                  </Grid>
                </Grid>
              </MetaContainer>
              {/* All lots column container */}
              <FieldArray
                name='data'
                render={(arrayHelpers) =>
                  values.data.map((lot, lotIndex) => (
                    // lot container
                    <Grid key={lotIndex} container direction='column'>
                      {/* lot header */}
                      <Grid container justifyContent='space-between'>
                        <Grid item xs={4}>
                          <FastField
                            component={FormTextField}
                            type='number'
                            fullWidth
                            name={`data.${lotIndex}.lot_number`}
                            label='Lot number'
                            {...getErrors(
                              errors['data'],
                              touched['data'],
                              lotIndex,
                              'lot_number'
                            )}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <AddRemove
                            disabled={values.data.length === 1}
                            onDelete={() => arrayHelpers.remove(lotIndex)}
                            onAdd={() => arrayHelpers.push(LOT_INITIAL)}
                          />
                        </Grid>
                      </Grid>
                      {/* lot detail container */}
                      <FieldArray
                        name={`data.${lotIndex}.detail`}
                        render={(arrayHelpers) =>
                          values.data[lotIndex].detail.map(
                            (lotDetail, lotDetailIndex) => (
                              <RawDetailForm
                                namePrefix={`data.${lotIndex}.detail.${lotDetailIndex}`}
                                errors={errors?.data?.[lotIndex]?.detail}
                                touched={touched?.data?.[lotIndex]?.detail}
                                arrayHelpers={arrayHelpers}
                                isDeleteDisabled={
                                  values.data[lotIndex].detail.length === 1
                                }
                                rowIndex={lotDetailIndex}
                              />
                            )
                          )
                        }
                      />
                    </Grid>
                  ))
                }
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </ViewWrapper>
  );
};

export default RawDebit;
