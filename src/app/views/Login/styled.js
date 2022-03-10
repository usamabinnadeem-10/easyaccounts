import { Form } from "formik";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/styles";

export const LoginWrapper = styled(Grid)(({ theme }) => ({
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(3)} !important`,
}));

export const StyledForm = styled(Form)(({ theme }) => ({
  width: "300px",
}));
