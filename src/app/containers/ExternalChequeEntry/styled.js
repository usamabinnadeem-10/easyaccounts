import { styled } from "@mui/styles";

import { Grid } from "@mui/material";

export const Wrapper = styled(Grid)(({ theme }) => ({
  borderRadius: "4px",
  backgroundColor: "rgba(105, 105, 105, 0.03)",
  padding: theme.spacing(3),
  maxWidth: "600px",
}));
