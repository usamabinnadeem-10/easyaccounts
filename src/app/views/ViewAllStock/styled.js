import { styled } from "@mui/styles";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
}));
