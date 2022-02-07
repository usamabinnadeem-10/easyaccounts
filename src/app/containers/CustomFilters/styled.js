import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Menu } from "@mui/material";
import { styled } from "@mui/styles";
import { LoadingButton } from "@mui/lab";

export const StyledGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "mb",
})(({ theme, mb }) => ({
  ...(mb && {
    marginBottom: theme.spacing(mb),
  }),
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

export const StyledButton = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== "mr",
})(({ theme, mr }) => ({
  ...(mr && {
    marginRight: `${theme.spacing(mr)} !important`,
  }),
}));
