import { styled } from "@mui/styles";

import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

export const Wrapper = styled(Grid)(({ theme }) => ({
  borderRadius: "4px",
  backgroundColor: "rgba(105, 105, 105, 0.03)",
  padding: theme.spacing(3),
  maxWidth: "600px",
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(4)} !important`,
}));
