import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

import Select from "react-select";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

import { useStyles } from "./styles";
import { customStyles } from "./styles";
import { FIELDS } from "../../../constants/fieldTypes";
import { resetAdded } from "../../../store/essentials/actions";
import { makeDate, getDateFromString } from "../../utilities/stringUtils";

const AddModal = ({
  open,
  handleClose,
  form,
  openSnackbar,
  closeSnackbar,
  isEdit = false,
  defaultFormState,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const essentials = useSelector((state) => state.essentials);

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetAdded());
    };
  }, []);

  useEffect(() => {
    setError(false);
  }, [state]);

  useEffect(() => {
    if (isEdit) {
      setState(defaultFormState);
    } else {
      setState({});
    }
  }, [form, isEdit, defaultFormState]);

  useEffect(() => {
    if (essentials.adding) {
      setLoading(true);
    }
    if (essentials.added) {
      setLoading(false);
      openSnackbar(true, "success", "Added successfully");
      handleClose();
    }
  }, [essentials.added, essentials.adding]);

  const handleChange = (value, label) => {
    setState({
      ...state,
      [label]: value,
    });
  };

  const submit = () => {
    let data = { ...state };
    for (let key in state) {
      if (typeof state[key] === "object") {
        data[key] = data[key].value;
      }
    }
    // check if all the required fields are in the data
    let canPost = true;
    form.formData.forEach((element) => {
      if (element.required && !data[element.name]) {
        openSnackbar(true, "error", `Please fill ${element.label}`);
        setError(true);
        canPost = false;
      }
    });
    if (canPost) {
      if (isEdit) {
        form.action(data);
      } else {
        dispatch(form.action(data));
      }
    }
  };

  return (
    <Modal paper="true" open={open} onClose={handleClose}>
      <Paper className={classes.paper}>
        <Typography
          textAlign="center"
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 900,
          }}
        >
          {form.heading}
        </Typography>
        <Grid container flexDirection="column" alignContent="center">
          {form.formData.map((field, index) => {
            return field.type === FIELDS.SELECT ? (
              <div key={index} className={classes.select}>
                <Select
                  styles={customStyles(error, state[field.name])}
                  placeholder={field.label}
                  value={state[field.name] || null}
                  onChange={(value) => handleChange(value, field.name)}
                  options={field.options}
                />
              </div>
            ) : field.type === FIELDS.DATE ? (
              <div key={index} className={classes.dateWrapper}>
                <CustomDatePicker
                  getDate={(date) =>
                    setState({ ...state, date: makeDate(date) })
                  }
                  value={getDateFromString(state.date)}
                />
              </div>
            ) : (
              <TextField
                error={error && field.required && !state[field.name]}
                multiline={field.type !== FIELDS.NUMBER}
                value={state[field.name] || ""}
                onChange={(e) => handleChange(e.target.value, field.name)}
                variant="outlined"
                key={index}
                label={field.label}
                fullWidth
                size="small"
                required
                sx={{ mb: 2.5, width: 0.9 }}
                type={field.type}
                InputProps={{
                  inputProps: field.type === FIELDS.NUMBER ? { min: 0 } : {},
                }}
              />
            );
          })}

          <LoadingButton
            loading={loading}
            onClick={submit}
            variant="contained"
            sx={{ mt: 2, fontWeight: 700 }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddModal;
