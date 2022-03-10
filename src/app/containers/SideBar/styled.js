import { styled } from "@mui/styles";
import { Typography } from "@mui/material";

export const BranchInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0rem ${theme.spacing(1)}`,
  marginTop: "auto",
  margin: `0px 10px`,
}));

export const BranchName = styled(Typography)(({ theme }) => ({
  fontWeight: "700 !important",
}));
