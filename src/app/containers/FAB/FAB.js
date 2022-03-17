import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import AddModal from "../AddModal/AddModal";

import { ACTION_FABS } from "./constants";
import { TRANSACTION } from "./constants";
import { useStyles } from "./styles";
import { chooseModal } from "./utils";

const FAB = ({ fetched }) => {
  const [clicked, setClicked] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [form, setForm] = useState([]);

  const state = useSelector((state) => state.essentials);

  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    setClicked(true);
  };

  const closeModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenModal = (name) => {
    setForm(chooseModal(name, state));
    setOpenAddModal(true);
    setClicked(false);
  };

  const handleOpenTransactionModal = (route) => {
    setClicked(false);
    closeModal();
    history.push(route);
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
            mr: 2,
            mb: 2,
          }}
        >
          {!clicked ? (
            <Fab
              disabled={!fetched}
              color="primary"
              onClick={() => handleClick()}
              sx={{
                width: 45,
                height: 45,
              }}
            >
              <AddCircleRoundedIcon />
            </Fab>
          ) : (
            <div className={classes.fabWrapper}>
              {ACTION_FABS.map((fab, index) => {
                return (
                  <Fade key={index} in={clicked} timeout={300}>
                    <Tooltip placement="right" title={fab.tooltip} arrow>
                      <Fab
                        color="secondary"
                        onClick={
                          fab.type === TRANSACTION
                            ? () => handleOpenTransactionModal(fab.route)
                            : () => handleOpenModal(fab.tooltip)
                        }
                        sx={{
                          mt: 1.2,
                          width: 45,
                          height: 45,
                          backgroundColor: fab.customColor || "secondary",
                        }}
                      >
                        {fab.icon}
                      </Fab>
                    </Tooltip>
                  </Fade>
                );
              })}
            </div>
          )}
        </Snackbar>
      </ClickAwayListener>
    </>
  );
};

export default FAB;
