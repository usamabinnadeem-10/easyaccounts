import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "80%",
  },
  selectCustomer: {
    width: "35%",
  },
  metaItems: {
    marginRight: "1rem",
    height: "100%",
  },
  total: {
    "& .Mui-disabled": {
      "-webkit-text-fill-color": "#000 !important",
    },
  },
  error: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red !important",
    },
  },
  addIcon: {
    marginBottom: "1.4rem",
    marginLeft: "0.8rem",
  },
});
