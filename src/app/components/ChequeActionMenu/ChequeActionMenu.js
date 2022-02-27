import React from "react";
import { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import CreateChequeHistory from "../../containers/CreateChequeHistory";

const ChequeActionMenu = ({ chequeId, chequeStatus, isPersonal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [addHistoryState, setAddHistoryState] = useState({
    showModal: false,
    isChequeEntry: false,
    chequeId: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // add history other than cheque
  const handleAddHistory = (chequeId) => {
    setAddHistoryState({
      showModal: true,
      isChequeEntry: false,
      chequeId,
    });
  };

  // add cheque against cheque
  const handleAddChequeHistory = (chequeId) => {
    setAddHistoryState({
      showModal: true,
      isChequeEntry: true,
      chequeId,
    });
  };

  // transfer cheque of one party to another
  const handleTransferCheque = (chequeId) => {};

  // return external transferred cheque
  const handleReturnTransferredCheque = (chequeId) => {};

  // return external cheque to original party
  const handleReturnExternalCheque = (chequeId) => {};

  // reissue personal cheque to a party
  const handleReissueReturnedPersonalCheque = (chequeId) => {};

  // pass external cheque
  const handlePassExternalCheque = (chequeId) => {};

  // clear external transferred cheque
  const handlePassExternalTransferredCheque = (chequeId) => {};

  // pass personal cheque
  const handlePassPersonalCheque = (chequeId) => {};

  // return personal cheque from party
  const handleReturnPersonalCheque = (chequeId) => {};

  const ACTIONS = {
    PERSONAL: {
      pending: [
        {
          action: handlePassPersonalCheque,
          name: "Clear personal cheque",
        },
        {
          action: handleReturnPersonalCheque,
          name: "Return personal cheque",
        },
      ],
      returned: [
        {
          action: handleReissueReturnedPersonalCheque,
          name: "Re-issue personal cheque",
        },
      ],
      cleared: [],
      cancelled: [],
    },
    EXTERNAL: {
      pending: [
        {
          action: handleTransferCheque,
          name: "Transfer cheque",
        },
        {
          action: handleAddHistory,
          name: "Add paid history",
        },
        {
          action: handleAddChequeHistory,
          name: "Add cheque history",
        },
        {
          action: handleReturnExternalCheque,
          name: "Return cheque to party",
        },
        {
          action: handlePassExternalCheque,
          name: "Clear party cheque",
        },
      ],
      transferred: [
        {
          action: handleReturnTransferredCheque,
          name: "Return transferred cheque",
        },
        {
          action: handlePassExternalTransferredCheque,
          name: "Clear transferred cheque",
        },
      ],
      cleared: [],
      returned: [],
    },
  };

  return (
    <div>
      {ACTIONS[isPersonal ? "PERSONAL" : "EXTERNAL"][chequeStatus].length >
        0 && (
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {ACTIONS[isPersonal ? "PERSONAL" : "EXTERNAL"][chequeStatus].map(
              (action, index) => (
                <MenuItem
                  disableRipple
                  key={index}
                  onClick={() => {
                    action.action(chequeId);
                    handleClose();
                  }}
                >
                  {action.name}
                </MenuItem>
              )
            )}
          </Menu>
        </>
      )}
      <CreateChequeHistory
        chequeId={chequeId}
        isChequeEntry={addHistoryState.isChequeEntry}
        open={addHistoryState.showModal}
        onClose={() =>
          setAddHistoryState({
            showModal: false,
            chequeId: "",
          })
        }
      />
    </div>
  );
};

export default ChequeActionMenu;
