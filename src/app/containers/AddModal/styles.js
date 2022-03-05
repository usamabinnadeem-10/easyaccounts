import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    padding: "1.5rem",
    maxHeight: "80vh",
    overflow: "auto",
  },
  select: {
    marginBottom: "1rem",
  },
  dateWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "35px",
    marginBottom: "1rem",
  },
});
