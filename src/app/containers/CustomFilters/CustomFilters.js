import React from 'react';
import { useState } from 'react';

import { Autocomplete } from '@mui/material';
import { Chip } from '@mui/material';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import CustomModal from '../../components/CustomModal';

import moment from 'moment';

import { StyledButton } from './styled';
import { StyledGrid } from './styled';

import * as constants from './constants';
import instance from '../../../utils/axiosApi';
import { makeQueryParamURL } from '../../utilities/stringUtils';
import { findErrorMessage } from '../../utilities/objectUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

const CustomFilters = ({ api, onSearch, filters, showErrorSnackbar }) => {
  const [filterState, setFilterState] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSetActiveFilters = (qp, val, placeholder, displayValue) => {
    let value = typeof val === 'string' ? val : val?.label;
    if (value) {
      let index = activeFilters.findIndex((filter) => filter.qp === qp);
      if (index === -1) {
        let newFilters = [
          ...activeFilters,
          { qp: qp, value: value, placeholder, displayValue },
        ];
        setActiveFilters(newFilters);
        return;
      } else {
        let newFilters = activeFilters;
        newFilters[index] = { qp: qp, value: value, placeholder, displayValue };
        setActiveFilters(newFilters);
        return;
      }
    } else {
      let newFilters = activeFilters.filter((filter) => filter.qp !== qp);
      setActiveFilters(newFilters);
      return;
    }
  };

  const handleSetFilter = (value, filter, reason, displayValue) => {
    let newFilterState = filterState;
    let qp = filter.qp;
    newFilterState[qp] = value;
    handleSetActiveFilters(qp, value, filter.placeholder, displayValue);
    if (reason === 'clear' || value === '') {
      delete newFilterState[qp];
    }
    setFilterState(newFilterState);
  };

  const search = () => {
    setIsLoading(true);
    let filters = Object.keys(filterState);
    let URL = api;
    if (filters.length > 0) {
      URL = makeQueryParamURL(
        URL,
        filters.map((filter) => ({
          key: filter,
          value:
            typeof filterState[filter] === 'string'
              ? filterState[filter]
              : filterState[filter].value,
        }))
      );
    }
    instance
      .get(URL)
      .then((response) => {
        onSearch(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorSnackbar(findErrorMessage(error?.response?.data));
      });
  };

  return (
    <>
      <StyledGrid
        mb={3}
        sx={{ backgroundColor: '#eee', p: 2, borderRadius: 1 }}
        container
        justifyContent='space-between'>
        <StyledGrid sx={{ overflow: 'auto' }} item xs={8}>
          {activeFilters.length > 0 ? (
            activeFilters.map((filter, index) => (
              <Chip
                onDelete={() => handleSetFilter('', filter, 'clear')}
                key={index}
                label={`${filter.placeholder} : ${
                  filter.displayValue || filter.value
                }`}
                sx={{ mr: 1, mb: 1 }}
                variant='outlined'
              />
            ))
          ) : (
            <Chip
              size='small'
              label='No Filters Applied'
              color='info'
              variant='contained'
            />
          )}
        </StyledGrid>
        <StyledGrid item xs={3}>
          <StyledGrid
            container
            gap={1}
            direction='column'
            justifyContent='flex-end'>
            <StyledButton
              size='small'
              onClick={handleClick}
              variant='contained'
              color='warning'>
              FILTERS
            </StyledButton>
            <StyledButton
              size='small'
              loading={isLoading}
              variant='contained'
              onClick={() => search()}>
              Search
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledGrid>
      <CustomModal open={modalOpen} handleClose={handleClose}>
        {filters.map((filter, index) => (
          <MenuItem disableRipple key={index}>
            {filter.type === constants.FIELDS.SELECT ? (
              <Autocomplete
                clearOnEscape
                autoComplete
                autoHighlight
                fullWidth
                size='small'
                getOptionLabel={(option) => option.label}
                options={filter.options}
                onChange={(e, value, reason) =>
                  handleSetFilter(value, filter, reason)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label={filter.placeholder}
                  />
                )}
                value={filterState[filter.qp] || null}
              />
            ) : filter.type === constants.FIELDS.DATE ? (
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label={filter.placeholder}
                  value={filterState[filter.qp]}
                  minDate={moment(Date.now()).subtract(10, 'years')}
                  maxDate={moment(Date.now()).add(10, 'years')}
                  onChange={(value) => {
                    let date = moment(value).format('yyyy-MM-DD');
                    if (!!filter.variant) {
                      if (filter.variant === 'start') {
                        date = `${date} 00:00:00`;
                      } else {
                        date = `${date} 23:59:59`;
                      }
                    }

                    handleSetFilter(
                      // moment(value).format('yyyy-MM-DD'),
                      date,
                      filter,
                      'set',
                      moment(value).format('DD-MM-YYYY')
                    );
                  }}
                  renderInput={(params) => (
                    <TextField size='small' fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                onChange={(e) => handleSetFilter(e.target.value, filter)}
                label={filter.placeholder}
                type={filter.type}
                size='small'
                fullWidth
                // value={filterState[filter.qp]}
                InputLabelProps={{ shrink: true }}
              />
            )}
          </MenuItem>
        ))}
        {/* <MenuItem sx={{ mt: 3 }} disableRipple>
            <StyledButton fullWidth variant="contained" onClick={() => search()}>
                Search
            </StyledButton>
            </MenuItem> */}
      </CustomModal>
    </>
  );
};

export default withSnackbar(CustomFilters);
