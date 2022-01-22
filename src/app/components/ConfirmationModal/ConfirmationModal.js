import React from "react";

import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Modal } from "@mui/material";
import { styled } from "@mui/material";
import { Typography } from "@mui/material";

export const StyledModal = styled(Modal, {
  shouldForwardProp: (prop) => prop !== "width",
})(({ width }) => ({
  top: "50% !important",
  left: "50% !important",
  width: width ? `${width}px` : "400px",
}));

export const CustomBackground = styled("div")(({ theme }) => ({
  background: "#fff",
  borderRadius: "0.4rem",
  transform: "translate(-50%, -50%)",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.16)`,
}));

export const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ color }) => ({
  top: "50% !important",
  left: "50% !important",
  marginBottom: "8px",
}));

const ConfirmationModal = ({ open, closeDialogue, setDialogueState }) => {
  return (
    <StyledModal onClose={closeDialogue} open={open}>
      <CustomBackground>
        <Text variant="body1">Are you sure you want to delete this item?</Text>
        <Grid spacing={4} container justify="space-between">
          <Grid flex={1} item>
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                setDialogueState({
                  open: false,
                  dialogueValue: false,
                })
              }
            >
              CANCEL
            </Button>
          </Grid>
          <Grid flex={1} item>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() =>
                setDialogueState({
                  open: false,
                  dialogueValue: true,
                })
              }
            >
              DELETE
            </Button>
          </Grid>
        </Grid>
      </CustomBackground>
    </StyledModal>
  );
};

export default ConfirmationModal;
