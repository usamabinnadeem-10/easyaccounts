import React from "react";
import { useState } from "react";

import { useHistory } from "react-router";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_FABS, DEFAULTS } from "./constants";

import { chooseModal } from "./utils";

import AddModal from '../AddModal/AddModal';

const FAB = () => {
  const [clicked, setClicked] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [form, setForm] = useState([]);

  const history = useHistory();

  const handleClick = () => {
    setClicked(true);
  };

  const closeModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenModal = (name) => {
    setForm(chooseModal(name));
    setOpenAddModal(true);
    setClicked(false);
  };

  const handleOpenTransactionModal = () => {
    setClicked(false);
    closeModal();
    history.push("/home/transaction");
  };

  return (
    <>
      {openAddModal && (
        <AddModal open={openAddModal} handleClose={closeModal} form={form} />
      )}

      <ClickAwayListener onClickAway={() => setClicked(false)}>
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            mr: 3,
            mb: 3,
          }}
        >
          {!clicked ? (
            <Fab
              color="primary"
              onClick={() => handleClick()}
              sx={{
                width: 60,
                height: 60,
              }}
            >
              <AddIcon />
            </Fab>
          ) : (
            <Grid container flexDirection="column">
              {ACTION_FABS.map((fab, index) => {
                return (
                  <Fade key={index} in={clicked} timeout={300}>
                    <Tooltip placement="left" title={fab.tooltip} arrow>
                      <Fab
                        color="secondary"
                        onClick={
                          fab.tooltip === DEFAULTS.NEW_TRANSACTION
                            ? () => handleOpenTransactionModal()
                            : () => handleOpenModal(fab.tooltip)
                        }
                        sx={{
                          mt: 2,
                          width: 60,
                          height: 60,
                        }}
                      >
                        {fab.icon}
                      </Fab>
                    </Tooltip>
                  </Fade>
                );
              })}
            </Grid>
          )}
        </Snackbar>
      </ClickAwayListener>
    </>
  );
};

export default FAB;
