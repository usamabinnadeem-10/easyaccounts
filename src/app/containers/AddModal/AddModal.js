import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Select from "react-select";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useStyles } from "./styles";
import { selectCustomStyles } from "./styles";

import { FIELDS } from "../../../constants/fieldTypes";

const AddModal = (props) => {
  const { open, handleClose, form } = props;
  const classes = useStyles();
  const [state, setState] = useState({});

  useEffect(() => {
    setState({});
  }, [form]);

  const handleChange = (value, label) => {
    setState({
      ...state,
      [label]: value,
    });
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
                  styles={selectCustomStyles}
                  placeholder={field.label}
                  value={state[field.name] || null}
                  onChange={(value) => handleChange(value, field.name)}
                  options={field.options}
                />
              </div>
            ) : (
              <TextField
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

          <Button variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddModal;
