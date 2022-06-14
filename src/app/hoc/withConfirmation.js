import React from 'react';
import { useState, useEffect } from 'react';

import ConfirmationModal from '../components/ConfirmationModal';

export const withConfirmation = (Component) => {
  return (props) => {
    const [confirmed, setConfirmed] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const askForConfirmation = (id) => {
      setId(id);
      setOpen(true);
    };

    const closeDialogue = () => {
      setOpen(false);
      setId(null);
    };

    const resetConfirmation = () => {
      setOpen(false);
      setId(null);
      setConfirmed(false);
    };

    const handleConfirmation = () => {
      setOpen(false);
      setConfirmed(true);
    };

    return (
      <>
        <ConfirmationModal
          open={open}
          closeDialogue={closeDialogue}
          onCancel={resetConfirmation}
          onConfirm={handleConfirmation}
        />
        <Component
          {...props}
          confirmId={id}
          confirmed={confirmed}
          askForConfirmation={askForConfirmation}
          resetConfirmation={resetConfirmation}
        />
      </>
    );
  };
};
