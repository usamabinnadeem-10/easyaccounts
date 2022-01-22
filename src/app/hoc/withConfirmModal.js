import React from 'react';

import {Modal} from '@mui/material';
import {styled} from '@mui/material';


export const StyledModal = styled(Modal, {
  shouldForwardProp: (prop) => prop !== 'width',
})(({width}) => ({
  top: '50% !important',
  left: '50% !important',
  width: width ? `${width}px` : '400px',
}));

export const CustomBackground = styled('div')(({theme}) => ({
  background: '#fff',
  borderRadius: '0.4rem',
  transform: 'translate(-50%, -50%)',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.16)`,
}));


const withConfirmModal = (WrappedComponent) => {
    return (props) => {
        const [open, setOpen] = React.useState(false);
        const handleClickOpen = () => {
            setOpen(true);
          };
        const handleClickClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        };

        return (
        <StyledModal 
            open={open} 
            closeDialog={handleClickClose}
            openDialog={handleClickOpen}
        >
            <CustomBackground>
                <WrappedComponent {...props}/>
            </CustomBackground>
        </StyledModal>
        );
    }
};

export default withConfirmModal;
