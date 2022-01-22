import React from "react";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

import { Box } from "@mui/system";

import { useStyles } from "./styles";

function StartEndDate({
  startDate,
  getStartDate,
  endDate,
  getEndDate,
  renderOnlySingleDate = false,
}) {
  const classes = useStyles();
  return (
    <div className={classes.dateContainer}>
      <CustomDatePicker
        placeholder={renderOnlySingleDate ? "Date" : "Start Date"}
        getDate={(date) => getStartDate(date)}
        value={startDate}
      />
      {!renderOnlySingleDate && (
        <>
          <Box component="span" ml={2} />
          <CustomDatePicker
            placeholder="End Date"
            getDate={(date) => getEndDate(date)}
            value={endDate}
          />
        </>
      )}
    </div>
  );
}

export default StartEndDate;
