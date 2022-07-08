import React from 'react';

import SelectPerson from '../SelectPerson/SelectPerson';
import StartEndDate from '../StartEndDate/StartEndDate';

import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Heading from '../Heading';

import { useStyles } from './styles';

import { useWindowSize } from '../../hooks/useWindowSize';

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
  const dimensions = useWindowSize();
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
        gap={2}
        justifyContent={dimensions.width < 600 ? 'center' : 'space-between'}
        className={classes.dateWrapper}>
        <StartEndDate
          startDate={startDate}
          endDate={endDate}
          getStartDate={setStartDate}
          getEndDate={setEndDate}
        />
        <LoadingButton
          size='small'
          loading={loading}
          variant='contained'
          fullWidth={dimensions.width < 600}
          sx={{ fontWeight: 900, mt: dimensions.width < 600 ? 2 : '0px' }}
          onClick={() => search()}>
          Search
        </LoadingButton>
      </Grid>
    </>
  );
}

export default SearchAndSelect;
