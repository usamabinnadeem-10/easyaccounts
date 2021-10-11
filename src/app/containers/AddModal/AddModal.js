import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  p: 2,
};

const AddModal = (props) => {
  const { open, handleClose, form } = props;

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
      <Paper sx={style}>
        <Typography
          textAlign="center"
          variant="h6"
          sx={{
            mb: 2,
          }}
        >
          {form.heading}
        </Typography>
        <Grid container flexDirection="column" alignContent="center">
          {form.formData.map((field, index) => {
            return (
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
                  inputProps:
                    field.type === "number" ? { min: 0, max: 10 } : {},
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
