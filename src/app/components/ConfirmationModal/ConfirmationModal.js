import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modals';

import { StyledModal, CustomBackground, Text } from './styled';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';

// Constants
import { MODAL_IDS } from '../../../constants/modalIds';

const ConfirmationModal = ({
  open,
  closeDialogue,
  setDialogueState,
  onCancel,
  onConfirm,
}) => {
  const modalId = MODAL_IDS.CONFIRMATION;
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modals[modalId]);

  const closeModalRedux = () => {
    dispatch(closeModal(modalId));
  };

  const handleClose = () => {
    if (closeDialogue) {
      closeDialogue();
    } else if (modalData) {
      closeModalRedux();
    }
  };

  const handleClickCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (setDialogueState) {
      setDialogueState({
        open: false,
        dialogueValue: false,
      });
    } else if (modalData) {
      modalData?.onCancel?.();
      closeModalRedux();
    } else {
      closeModalRedux();
    }
  };

  const handleClickConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (setDialogueState) {
      setDialogueState({
        open: false,
        dialogueValue: true,
      });
    } else if (modalData) {
      modalData?.onConfirm();
      closeModalRedux();
    }
  };

  return (
    <StyledModal onClose={handleClose} open={open || modalData?.open}>
      <CustomBackground>
        <Text variant="body1">
          {modalData?.descriptionText ||
            'Are you sure you want to delete this item?'}
        </Text>
        <Grid spacing={4} container justify="space-between">
          <Grid flex={1} item>
            <Button fullWidth variant="contained" onClick={handleClickCancel}>
              {modalData?.cancelText || 'CANCEL'}
            </Button>
          </Grid>
          <Grid flex={1} item>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={handleClickConfirm}
            >
              {modalData?.confirmText || 'DELETE'}
            </Button>
          </Grid>
        </Grid>
      </CustomBackground>
    </StyledModal>
  );
};

export default ConfirmationModal;
