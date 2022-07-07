import React from 'react';

import { useSelector } from 'react-redux';

import CustomToggleButtons from '../CustomToggleButtons/CustomToggleButtons';

import { Grid } from '@mui/material';
import Select from 'react-select';

import { PERSON_TYPES, PERSON_TYPES_CUSTOMER } from './constants';
import { PERSONS } from './constants';
import { useStyles } from './styles';
import { selectCustomStyles } from './styles';

import { ROLES } from '../../../constants/roles';

import { useWindowSize } from '../../hooks/useWindowSize';

function SelectPerson({
  currentPerson,
  personType,
  setCurrentPerson,
  options,
  setPersonType,
}) {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.userRole);
  const dimensions = useWindowSize();
  return (
    <Grid
      container
      justifyContent={dimensions.width < 600 ? 'center' : 'space-between'}
      className={classes.container}>
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
        buttons={
          [ROLES.ADMIN].includes(role) ? PERSON_TYPES : PERSON_TYPES_CUSTOMER
        }
        selectedValue={personType}
        getSelectedValue={(value) => setPersonType(value)}
      />
    </Grid>
  );
}

export default SelectPerson;
