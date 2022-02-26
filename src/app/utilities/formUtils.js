import React from "react";

import { Field } from "formik";

import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import moment from "moment";

export const FormTextField = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <TextField
      {...props}
      {...field}
      error={touched[field.name] && !!errors[field.name]}
      helperText={touched[field.name] && errors[field.name]}
    />
  );
};

export const FormAutoCompleteField = ({ field, form, ...props }) => {
  return (
    <Autocomplete
      {...props}
      fullWidth
      clearOnEscape
      size="small"
      renderInput={(params) => (
        <Field
          {...params}
          {...props}
          field={field}
          form={form}
          component={FormTextField}
        />
      )}
    />
  );
};

export const FormDateField = ({ field, form, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        {...props}
        value={field.value}
        minDate={moment(Date.now()).subtract(10, "years")}
        maxDate={moment(Date.now()).add(10, "years")}
        // showToolbar
        // toolbarTitle={props.label || "Date"}
        // toolbarFormat="DD-MM-YYYY"
        onChange={(value) => props.onChange(moment(value).format("yyyy-MM-DD"))}
        renderInput={(params) => (
          <Field
            {...params}
            {...props}
            field={field}
            form={form}
            component={FormTextField}
          />
        )}
      />
    </LocalizationProvider>
  );
};
