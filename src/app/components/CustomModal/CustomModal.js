import React from 'react';

import Modal from '@mui/material/Modal';

import { StyledPaper } from './styled';

const CustomModal = ({ children, open, handleClose }) => {
  return (
    <Modal paper='true' open={open} onClose={handleClose}>
      <StyledPaper>{children}</StyledPaper>
    </Modal>
  );
};

export default CustomModal;
