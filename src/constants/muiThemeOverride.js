import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";

import "typeface-poppins";

export const theme = createTheme({
  typography: typography,
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
  },
});
