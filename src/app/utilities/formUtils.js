import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

import CustomSwitch from '../components/CustomSwitch';
import CustomToggleButtons from '../components/CustomToggleButtons';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import moment from 'moment';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
  '& .MuiInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
}));

export const FormTextField = ({
  field,
  form: { touched, errors },
  isError,
  errorText,
  ...props
}) => {
  return (
    <StyledTextField
      {...field}
      {...props}
      size='small'
      error={(touched[field.name] && !!errors[field.name]) || isError}
      helperText={
        (touched[field.name] && errors[field.name]) ||
        (isError ? errorText : null)
      }
    />
  );
};

export const FormAutoCompleteField = ({
  field: { value, name, onBlur },
  form: { touched, errors, setFieldTouched, setFieldValue },
  options,
  label,
  onChange,
  isError,
  errorText,
  variant,
  freeSolo,
  type,
  ...props
}) => {
  return (
    <Autocomplete
      onChange={(event, value, reason) => {
        setFieldTouched(name);
        if (reason === 'clear' || !value) {
          setFieldValue(name, '');
        } else {
          setFieldValue(name, value);
        }
      }}
      onInputChange={(event, value, reason) => {
        freeSolo &&
          setFieldValue(name, {
            value: parseFloat(value),
            label: value,
          });
      }}
      value={value}
      options={options}
      size='small'
      clearOnEscape
      fullWidth
      freeSolo={freeSolo}
      onBlur={() => setFieldTouched(name)}
      renderInput={(params) => (
        <StyledTextField
          onBlur={onBlur}
          error={(touched[name] && !!errors[name]) || isError}
          helperText={
            (touched[name] && errors[name]) || (isError ? errorText : null)
          }
          type={type}
          fullWidth
          label={label}
          variant={variant || 'outlined'}
          {...params}
        />
      )}
    />
  );
};

export const FormDateField = ({
  field: { name, value, onChange, onBlur },
  form: { touched, errors, setFieldValue, setFieldTouched },
  isError,
  errorText,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        value={value || null}
        minDate={moment(Date.now()).subtract(10, 'years')}
        maxDate={moment(Date.now()).add(10, 'years')}
        onChange={(value) => {
          setFieldTouched(name);
          setFieldValue(name, moment(value).format('yyyy-MM-DD'));
        }}
        label={props.label}
        inputFormat='DD/MM/yyyy'
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={onBlur}
            fullWidth
            size={props.size || 'small'}
            error={(touched[name] && !!errors[name]) || isError}
            helperText={
              (touched[name] && errors[name]) || (isError ? errorText : null)
            }
            name={name}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export const FormSwitchField = ({
  field: { name, value },
  form: { setFieldValue },
  label,
  onCheckedLabel,
  ...props
}) => {
  const handleChange = (e) => {
    setFieldValue(name, e.target.checked);
  };
  return (
    <CustomSwitch
      checked={value}
      onChange={handleChange}
      label={label}
      onCheckedLabel={onCheckedLabel}
    />
  );
};

export const FormToggleField = ({
  field: { name, value },
  form: { setFieldValue },
  buttons,
}) => {
  const handleChange = (val) => {
    setFieldValue(name, val);
  };
  return (
    <CustomToggleButtons
      selectedValue={value}
      buttons={buttons}
      getSelectedValue={handleChange}
    />
  );
};

// utility function to get the errors for array fields
// pass the actual array wherever it is located inside the form
export const getErrors = (errors, touched, index, name) => {
  if (errors?.[index]?.[name] && touched?.[index]?.[name]) {
    return {
      isError: true,
      errorText: errors[index][name],
    };
  }
  return {
    isError: false,
    errorText: '',
  };
};
