import React from "react";

import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
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

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetFilter = (value, qp) => {
    let newFilterState = filterState;
    newFilterState[qp] = value;
    setFilterState(newFilterState);
  };

  const search = () => {
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
    });
  };

  return (
    <StyledGrid container justifyContent="flex-end">
      <Button
        onClick={handleClick}
        size="large"
        variant="contained"
        color="info"
      >
        FILTERS
      </Button>
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
                  handleSetFilter(value, filter.qp)
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
                onChange={(e) => handleSetFilter(e.target.value, filter.qp)}
                placeholder={filter.placeholder}
                type="date"
                value={filterState[filter.qp]}
              />
            )}
          </MenuItem>
        ))}
        <MenuItem sx={{ mt: 3 }} disableRipple>
          <StyledButton fullWidth variant="contained" onClick={() => search()}>
            Search
          </StyledButton>
        </MenuItem>
      </StyledMenu>
    </StyledGrid>
  );
};

export default CustomFilters;
