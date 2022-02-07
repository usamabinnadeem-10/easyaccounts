import React from "react";

import { Autocomplete } from "@mui/material";
import { Chip } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";

import { StyledButton } from "./styled";
import { StyledGrid } from "./styled";
import { StyledMenu } from "./styled";

import * as constants from "./constants";
import instance from "../../../utils/axiosApi";
import { makeQueryParamURL } from "../../utilities/stringUtils";

const CustomFilters = ({ api, onSearch, filters }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterState, setFilterState] = React.useState({});
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetActiveFilters = (qp, val, placeholder) => {
    let value = typeof val === "string" ? val : val?.label;
    if (value) {
      let index = activeFilters.findIndex((filter) => filter.qp === qp);
      if (index === -1) {
        setActiveFilters([
          ...activeFilters,
          { qp: qp, value: value, placeholder },
        ]);
        return;
      } else {
        let newFilters = activeFilters;
        newFilters[index] = { qp: qp, value: value, placeholder };
        setActiveFilters(newFilters);
        return;
      }
    } else {
      let newFilters = activeFilters.filter((filter) => filter.qp !== qp);
      setActiveFilters(newFilters);
      return;
    }
  };

  const handleSetFilter = (value, filter, reason) => {
    let newFilterState = filterState;
    let qp = filter.qp;
    newFilterState[qp] = value;
    handleSetActiveFilters(qp, value, filter.placeholder);
    if (reason === "clear" || value === "") {
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
            typeof filterState[filter] === "string"
              ? filterState[filter]
              : filterState[filter].value,
        }))
      );
    }
    instance.get(URL).then((response) => {
      onSearch(response.data);
      setIsLoading(false);
    });
  };

  return (
    <StyledGrid
      mb={3}
      sx={{ backgroundColor: "#eee", p: 2, borderRadius: 1 }}
      container
      justifyContent="space-between"
    >
      <StyledGrid item xs={8}>
        {activeFilters.length > 0 ? (
          activeFilters.map((filter, index) => (
            <Chip
              onDelete={() => handleSetFilter("", filter, "clear")}
              key={index}
              label={`${filter.placeholder} : ${filter.value}`}
              sx={{ mr: 1, mb: 1 }}
              variant="outlined"
            />
          ))
        ) : (
          <Chip label="No Filters Applied" color="info" variant="contained" />
        )}
      </StyledGrid>
      <StyledGrid item xs={4}>
        <StyledGrid container justifyContent="flex-end">
          <StyledButton
            onClick={handleClick}
            variant="contained"
            color="warning"
            mr={8}
          >
            FILTERS
          </StyledButton>
          <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {filters.map((filter, index) => (
              <MenuItem disableRipple key={index}>
                {filter.type === constants.FIELDS.SELECT ? (
                  <Autocomplete
                    clearOnEscape
                    autoComplete
                    fullWidth
                    size="small"
                    getOptionLabel={(option) => option.label}
                    options={filter.options}
                    onChange={(e, value, reason) =>
                      handleSetFilter(value, filter, reason)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={filter.placeholder}
                      />
                    )}
                    value={filterState[filter.qp]}
                  />
                ) : (
                  <TextField
                    onChange={(e) => handleSetFilter(e.target.value, filter)}
                    label={filter.placeholder}
                    type={filter.type}
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
          </StyledMenu>
          <StyledButton
            loading={isLoading}
            variant="contained"
            onClick={() => search()}
          >
            Search
          </StyledButton>
        </StyledGrid>
      </StyledGrid>
    </StyledGrid>
  );
};

export default CustomFilters;
