import { styled } from "@mui/styles";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid rgba(105, 105, 105, 0.5)`,
  paddingBottom: theme.spacing(2),
}));
