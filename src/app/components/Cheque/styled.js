import { styled } from "@mui/styles";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(105,105,105,0.03)",
  display: "flex",
  flexDirection: "column",
  border: "2px solid black",
  padding: "4px",
  borderRadius: "8px",
}));

export const StyledGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})(({ theme, bgColor }) => ({
  backgroundColor: bgColor || "#fff",
  padding: theme.spacing(2),
}));

export const AmountBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF",
  borderRadius: "4px",
  padding: theme.spacing(1, 2),
  textAlign: "center",
}));
