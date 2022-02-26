import React from "react";

import SelectPerson from "../SelectPerson/SelectPerson";
import StartEndDate from "../StartEndDate/StartEndDate";

import { Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Heading from "../Heading";

import { useStyles } from "./styles";

function SearchAndSelect({
  header,
  currentPerson,
  personType,
  setCurrentPerson,
  options,
  setPersonType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  search,
}) {
  const classes = useStyles();
  return (
    <>
      <Heading heading={header} />
      <SelectPerson
        currentPerson={currentPerson}
        personType={personType}
        setCurrentPerson={setCurrentPerson}
        options={options}
        setPersonType={setPersonType}
      />
      <Grid
        container
        justifyContent="space-between"
        className={classes.dateWrapper}
      >
        <StartEndDate
          startDate={startDate}
          endDate={endDate}
          getStartDate={setStartDate}
          getEndDate={setEndDate}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{ fontWeight: 900 }}
          onClick={() => search()}
        >
          Search
        </LoadingButton>
      </Grid>
    </>
  );
}

export default SearchAndSelect;
