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
  dateWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "35px",
    marginBottom: "1rem",
  },
});

export const customStyles = (error, value) => {
  return {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 100,
    }),
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: !error || value ? "#ddd" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: !error || value ? "#ddd" : "red",
      },
    }),
  };
};
