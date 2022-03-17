import React from "react";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import { StyledGrid } from "./styled";

import { capitalizeFirstLetter } from "../../utilities/stringUtils";

const DyingReturnMeta = ({ lotData }) => {
  return (
    <StyledGrid container rowGap={1}>
      {Object.entries(lotData).map(([key, value], index) => (
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ mr: 2 }}>
            {capitalizeFirstLetter(key.replaceAll("_", " "))}:
          </Typography>
          <Typography variant="caption">{value}</Typography>
        </Grid>
      ))}
    </StyledGrid>
  );
};

export default DyingReturnMeta;
