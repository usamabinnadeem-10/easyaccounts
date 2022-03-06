import * as React from "react";

import { TextField } from "@mui/material";

import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import moment from "moment";

export default function CustomDatePicker({
  getDate,
  value,
  placeholder,
  fullWidth,
}) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        value={value || null}
        minDate={moment(Date.now()).subtract(20, "years")}
        maxDate={moment(Date.now()).add(20, "years")}
        onChange={(value) => getDate(moment(value).format("yyyy-MM-DD"))}
        inputFormat="DD/MM/yyyy"
        renderInput={(params) => (
          <TextField
            fullWidth={fullWidth}
            label={placeholder || "Date"}
            size="small"
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
