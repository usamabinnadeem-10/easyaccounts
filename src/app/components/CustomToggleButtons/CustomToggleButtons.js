import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      margin: 0,
      fontWeight: 900,
      marginRight: "0.3rem",
      minWidth: "4rem",
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      margin: 0,
      marginRight: "0.3rem",
      fontWeight: 900,
      minWidth: "4rem",
    },
  },
}));

/**
 * Adds a note against candidate.
 * @param {object} props
 * @return {node} ToggleButtons.
 */
function CustomToggleButtons(props) {
  const { buttons, getSelectedValue, selectedValue } = props;

  const handleChange = (event, optionSelected) => {
    if (optionSelected) {
      getSelectedValue(optionSelected);
    }
  };

  return (
    <StyledToggleButtonGroup
      exclusive
      onChange={handleChange}
      value={selectedValue}
    >
      {buttons.map((button, index) => {
        return (
          <ToggleButton
            color={button.color}
            key={index}
            selected={button.value === selectedValue}
            size="small"
            value={button.value}
          >
            {button.name}
          </ToggleButton>
        );
      })}
    </StyledToggleButtonGroup>
  );
}

export default CustomToggleButtons;
