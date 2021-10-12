import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    padding: "1.5rem",
  },
  select: {
    marginBottom: "1rem",
  },
});

export const selectCustomStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 100,
  }),
};
