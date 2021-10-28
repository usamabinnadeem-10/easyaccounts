import React from "react";

import SelectPerson from "../SelectPerson/SelectPerson";
import StartEndDate from "../StartEndDate/StartEndDate";
import CustomLoader from "../CustomLoader/CustomLoader";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useStyles } from "./styles";

function SearchAndSelect(props) {
  const {
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
  } = props;

  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 4 }}>
        {header}
      </Typography>
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
          loadingIndicator={<CustomLoader loading={loading} height={10} />}
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
