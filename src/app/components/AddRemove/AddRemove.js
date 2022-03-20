import React from "react";

import { IconButton } from "@mui/material";
import { Grid } from "@mui/material";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRemove = ({ disabled, onDelete, onAdd }) => {
  return (
    <Grid container justifyContent="flex-end">
      <IconButton disabled={disabled} onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={onAdd}>
        <AddCircleRoundedIcon />
      </IconButton>
    </Grid>
  );
};

export default AddRemove;
