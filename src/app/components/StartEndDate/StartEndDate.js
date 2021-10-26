import React from "react";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

import { Box } from "@mui/system";

import { useStyles } from "./styles";

function StartEndDate(props) {
  const { startDate, getStartDate, endDate, getEndDate } = props;
  const classes = useStyles();
  return (
    <div className={classes.dateContainer}>
      <CustomDatePicker
        placeholder="Start Date"
        getDate={(date) => getStartDate(date)}
        value={startDate}
      />
      <Box component="span" ml={2} />
      <CustomDatePicker
        placeholder="End Date"
        getDate={(date) => getEndDate(date)}
        value={endDate}
      />
    </div>
  );
}

export default StartEndDate;
