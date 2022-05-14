import React from 'react';
import { useState } from 'react';

import { Grid } from '@mui/material';

import { FastField } from 'formik';

import AddRemove from '../../../components/AddRemove';

import { FormAutoCompleteField } from '../../../utilities/formUtils';
import { FormTextField } from '../../../utilities/formUtils';
import { getErrors } from '../../../utilities/formUtils';

import { INITIAL } from './constants';

const DEFAULT_FIELDS = [
  {
    field: 'quantity',
    type: 'number',
    label: 'Quantity',
  },
  {
    field: 'actual_gazaana',
    type: 'number',
    label: 'Actual',
  },
  {
    field: 'expected_gazaana',
    type: 'number',
    label: 'Expected',
  },
  {
    field: 'formula',
    type: 'select',
    label: 'Formula',
  },
  {
    field: 'warehouse',
    type: 'select',
    label: 'Warehouse',
  },
];

const RawDetailForm = ({
  isTransfer = false,
  namePrefix = '',
  errors,
  touched,
  rowIndex,
  arrayHelpers,
  isDeleteDisabled,
}) => {
  const [fields, setFields] = useState([
    ...DEFAULT_FIELDS,
    isTransfer
      ? {
          field: 'to_warehouse',
          type: 'select',
          label: 'Transfer to',
        }
      : {
          field: 'rate',
          type: 'number',
          label: 'Rate',
        },
  ]);

  return (
    <Grid container justifyContent='space-between'>
      <Grid item xs={9}>
        <Grid container>
          {fields.map((field, fieldIndex) => (
            <Grid key={fieldIndex} item xs={2}>
              <FastField
                component={
                  field.type === 'select'
                    ? FormAutoCompleteField
                    : FormTextField
                }
                name={`${namePrefix}.${field.field}`}
                fullWidth
                label={field.label}
                variant='standard'
                {...getErrors(errors, touched, rowIndex, field.field)}
                options={[]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <AddRemove
          disabled={isDeleteDisabled}
          onDelete={() => arrayHelpers.remove(rowIndex)}
          onAdd={() =>
            arrayHelpers.push(
              isTransfer ? INITIAL['transfer'] : INITIAL['other']
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default RawDetailForm;
