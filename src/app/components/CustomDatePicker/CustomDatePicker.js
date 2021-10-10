import * as React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

import "./date.css";

export default function CustomDatePicker(props) {
  const { getDate, value } = props;

  return (
    <DatePicker
      value={value}
      onChange={getDate}
      inputPlaceholder="Date"
      shouldHighlightWeekends
      calendarPopperPosition="bottom"
      inputClassName="input-date"
    />
  );
}
