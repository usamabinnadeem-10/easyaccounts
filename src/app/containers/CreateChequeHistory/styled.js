import { styled } from "@mui/styles";

import LoadingButton from "@mui/lab/LoadingButton";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  padding: theme.spacing(2),
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(3)} !important`,
}));
