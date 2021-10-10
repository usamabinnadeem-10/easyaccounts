import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  toggleButton: {
    "& .MuiToggleButton-label": {
      height: "100%",
    },
    border: "0rem",
    borderRadius: "0.4rem",
    // 'color': cinchdark,
    // 'height': theme.spacing(3),
    marginRight: "1rem",
    textTransform: "capitalize",
  },
  toggleButtonPadding: {
    padding: "1rem",
  },
});
