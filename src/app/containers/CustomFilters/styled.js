import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Menu } from "@mui/material";
import { styled } from "@mui/styles";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "200px",
    overflow: "scroll",
    minHeight: "200px",
    "& .MuiMenuItem-root": {
      justifyContent: "center",
    },
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({}));
