import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0.8rem 1.6rem",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(105, 105, 105, 0.03)",
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
});
