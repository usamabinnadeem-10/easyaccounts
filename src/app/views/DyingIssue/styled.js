import { Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(105, 105, 105, 0.03)",
  borderRadius: "4px",
  padding: theme.spacing(2),
  width: "75vw",
}));

export const Meta = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid rgba(105, 105, 105, 0.3)`,
}));
