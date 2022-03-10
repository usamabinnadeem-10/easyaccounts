import { styled } from "@mui/styles";
import { Grid } from "@mui/material";

export const BranchBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})(({ theme, bgcolor }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: bgcolor || "#fff",
  width: "300px",
  alignItems: "center",
  padding: theme.spacing(1, 2),
}));

export const ButtonWrapper = styled(Grid)(({ theme }) => ({
  textAlign: "end",
}));
