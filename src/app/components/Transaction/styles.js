import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "75%",
  },
  selectCustomer: {
    width: "35%",
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
