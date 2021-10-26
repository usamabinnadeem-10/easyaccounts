import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  tableWrapper: {
    backgroundColor: "rgba(105, 105, 105, 0.03)",
    padding: "1rem 1.2rem",
    borderRadius: "0.4rem",
    width: "100%",
    borderSpacing: "0",
  },
  tableHead: {
    textAlign: "left",
  },
  headCell: {
    padding: "0.6rem 0",
    borderBottom: "0.5px solid rgba(105, 105, 105, 0.3)",
  },
  rowCell: {
    maxWidth: "200px",
    padding: "0.5rem 0",
    borderBottom: "0.5px solid rgba(105, 105, 105, 0.2)",
    overflowWrap: "anywhere",
    paddingRight: "0.4rem",
  },
});
