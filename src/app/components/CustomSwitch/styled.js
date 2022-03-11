import { styled } from "@mui/styles";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  columnGap: theme.spacing(2),
  alignItems: "center",
}));
