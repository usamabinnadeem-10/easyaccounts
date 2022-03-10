import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const BranchWrapper = styled(Grid)(({ theme }) => ({
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: `${theme.spacing(4)} !important`,
  width: "300px",
}));

export const SkeletonWrapper = styled("div")(({ theme }) => ({
  width: "300px",
  padding: theme.spacing(1, 2),
  paddingRight: theme.spacing(5),
  backgroundColor: "#f0f0f0",
}));
