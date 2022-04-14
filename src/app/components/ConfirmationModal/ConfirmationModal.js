import React from 'react';

import { StyledModal, CustomBackground, Text } from './styled';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

const ConfirmationModal = ({ open, closeDialogue, setDialogueState }) => {
  return (
    <StyledModal onClose={closeDialogue} open={open}>
      <CustomBackground>
        <Text variant='body1'>Are you sure you want to delete this item?</Text>
        <Grid spacing={4} container justify='space-between'>
          <Grid flex={1} item>
            <Button
              fullWidth
              variant='contained'
              onClick={() =>
                setDialogueState({
                  open: false,
                  dialogueValue: false,
                })
              }>
              CANCEL
            </Button>
          </Grid>
          <Grid flex={1} item>
            <Button
              fullWidth
              color='error'
              variant='contained'
              onClick={() =>
                setDialogueState({
                  open: false,
                  dialogueValue: true,
                })
              }>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </CustomBackground>
    </StyledModal>
  );
};

export default ConfirmationModal;
