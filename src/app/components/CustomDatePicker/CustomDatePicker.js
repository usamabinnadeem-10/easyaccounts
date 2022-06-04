import * as React from 'react';

import { TextField } from '@mui/material';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import moment from 'moment';

export default function CustomDatePicker({
  getDate,
  value,
  placeholder,
  fullWidth,
  isStartDate,
  isEndDate,
}) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        label={placeholder || 'Date'}
        value={value || null}
        minDate={moment(Date.now()).subtract(10, 'years')}
        maxDate={moment(Date.now()).add(10, 'years')}
        onChange={(value) => {
          let time = moment().format('HH:mm:ss');
          time = isStartDate ? '00:00:00' : isEndDate ? '23:59:59' : time;
          let date = moment(value).format('yyyy-MM-DD');
          let final = moment(date + ' ' + time).format('yyyy-MM-DD HH:mm:ss');
          getDate(final);
        }}
        inputFormat='DD/MM/yyyy'
        renderInput={(params) => (
          <TextField
            fullWidth={fullWidth}
            label={placeholder || 'Date'}
            size='small'
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
