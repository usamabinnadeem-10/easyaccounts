import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "75vw",
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  accountTypesWrapper: {
    display: "flex",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    rowGap: "20px",
  },
});
