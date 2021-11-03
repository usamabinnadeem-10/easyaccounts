import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

function CustomSnackbar({ message, open, severity, handleClose }) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
