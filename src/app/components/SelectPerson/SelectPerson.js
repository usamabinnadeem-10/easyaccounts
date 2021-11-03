import React from "react";

import CustomToggleButtons from "../CustomToggleButtons/CustomToggleButtons";

import { Grid } from "@mui/material";
import Select from "react-select";

import { PERSON_TYPES } from "./constants";
import { PERSONS } from "./constants";
import { useStyles } from "./styles";
import { selectCustomStyles } from "./styles";

function SelectPerson({
  currentPerson,
  personType,
  setCurrentPerson,
  options,
  setPersonType,
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.container}
    >
      <div className={classes.people}>
        <Select
          styles={selectCustomStyles}
          placeholder={PERSONS[personType]}
          value={currentPerson}
          onChange={(person) => setCurrentPerson(person)}
          options={options}
        />
      </div>
      <CustomToggleButtons
        buttons={PERSON_TYPES}
        selectedValue={personType}
        getSelectedValue={(value) => setPersonType(value)}
      />
    </Grid>
  );
}

export default SelectPerson;
