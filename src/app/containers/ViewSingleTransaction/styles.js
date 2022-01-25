import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  transactionWrapper: {
    width: "60vw",
    padding: "0.8rem 1.6rem",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(105, 105, 105, 0.03)",
    "@media print": {
      width: "100vw !important",
    },
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0",
    borderBottom: "1px solid rgba(105, 105, 105, 0.3)",
  },
  metaItem: {
    display: "flex",
  },
  table: {
    padding: "1rem 0.8rem",
  },
  total: {
    marginTop: "0.8rem",
    display: "flex",
    justifyContent: "flex-end",
  },
});
