import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "75vw",
    padding: "0.8rem 1.6rem",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(105, 105, 105, 0.03)",
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  table: {
    margin: "1.2rem 0",
  },
  ledgerWrapper: {
    "@media print": {
      margin: "12px",
    },
  },
});
