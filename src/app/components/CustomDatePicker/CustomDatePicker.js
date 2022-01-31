import * as React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

import "./date.css";

export default function CustomDatePicker({
  getDate,
  value,
  placeholder,
  fullWidth = true,
}) {
  return (
    <DatePicker
      value={value}
      onChange={getDate}
      inputPlaceholder={placeholder || "Date"}
      shouldHighlightWeekends
      calendarPopperPosition="bottom"
      inputClassName="input-date"
      wrapperClassName={fullWidth && "date-wrapper"}
    />
  );
}
