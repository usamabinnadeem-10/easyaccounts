import React from "react";

import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/styles";

import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import moment from "moment";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
    },
  },
}));

export const FormTextField = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <StyledTextField
      {...field}
      {...props}
      error={touched[field.name] && !!errors[field.name]}
      helperText={touched[field.name] && errors[field.name]}
    />
  );
};

export const FormAutoCompleteField = ({
  field: { value, name, onBlur },
  form: { touched, errors, setFieldTouched, setFieldValue },
  options,
  label,
  onChange,
  ...props
}) => {
  return (
    <Autocomplete
      onChange={(event, value, reason) => {
        setFieldTouched(name);
        if (reason === "clear" || !value) {
          setFieldValue(name, "");
        } else {
          setFieldValue(name, value);
        }
      }}
      isOptionEqualToValue={(option, value) => {
        if (value) {
          return option.value === value.value;
        }
        return true;
      }}
      value={value}
      options={options}
      size="small"
      clearOnEscape
      fullWidth
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          onBlur={onBlur}
          error={touched[name] && !!errors[name]}
          helperText={touched[name] && errors[name]}
          fullWidth
          label={label}
          {...params}
        />
      )}
    />
  );
};

export const FormDateField = ({
  field: { name, value, onChange, onBlur },
  form: { touched, errors, setFieldValue, setFieldTouched },
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        value={value || null}
        minDate={moment(Date.now()).subtract(10, "years")}
        maxDate={moment(Date.now()).add(10, "years")}
        onChange={(value) => {
          setFieldTouched(name);
          setFieldValue(name, moment(value).format("yyyy-MM-DD"));
        }}
        label={props.label}
        inputFormat="DD/MM/yyyy"
        renderInput={(params) => (
          <TextField
            onBlur={onBlur}
            fullWidth
            size={props.size}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            name={name}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};
