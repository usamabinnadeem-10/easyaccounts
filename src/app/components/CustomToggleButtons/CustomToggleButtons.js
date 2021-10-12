import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

import { useStyles } from "./styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  grouped: {
    "&:first-of-type": {
      borderRadius: "0.4rem",
    },
    "&:not(:first-of-type)": {
      borderRadius: "0.4rem",
      "margin-left": "0rem",
    },
    border: "none",
    "margin-right": "1rem",
  },
}));

/**
 * Adds a note against candidate.
 * @param {object} props
 * @return {node} ToggleButtons.
 */
function CustomToggleButtons(props) {
  const { buttons, getSelectedValue, selectedValue } = props;

  let classes = useStyles();

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
            classes={{
              sizeSmall: classes.toggleButtonPadding,
            }}
            className={classes.toggleButton}
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
