import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#fb8c00",
    },
    error: {
      main: "#ff1744",
    },
  },
  typography: {
    htmlFontSize: "62.5%",
    fontFamily: "Montserrat",
  },
});
