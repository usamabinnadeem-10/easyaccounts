import React from "react";
import { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import ChequeActions from "../../containers/ChequeActions";
import CreateChequeHistory from "../../containers/CreateChequeHistory";

import { ACTION_TYPES } from "../../containers/ChequeActions/constants";

const ChequeActionMenu = ({
  chequeId,
  chequeStatus,
  isPersonal,
  chequeSerial,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [addHistoryState, setAddHistoryState] = useState({
    showModal: false,
    isChequeEntry: false,
    chequeId: "",
  });

  const [chequeActionState, setChequeActionState] = useState({
    actionType: null,
    open: false,
    chequeId: null,
    isPersonal: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getChequeIdHelper = (chequeId, isPersonal) => ({
    chequeId: chequeId,
    isPersonal: isPersonal,
    open: true,
  });

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

  // -----------------------------EXTERNAL CHEQUE FUNCTIONS--------------------------------- //

  // pass external cheque
  const handlePassExternalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.EXTERNAL.PASS,
      ...getChequeIdHelper(chequeId, false),
    });
  };

  // transfer external cheque of one party to another
  const handleTransferExternalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.EXTERNAL.TRANSFER,
      ...getChequeIdHelper(chequeId, false),
    });
  };

  // return external cheque to original party
  const handleReturnExternalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.EXTERNAL.RETURN,
      ...getChequeIdHelper(chequeId, false),
    });
  };

  // return external transferred cheque
  const handleReturnExternalTransferredCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.EXTERNAL.RETURN_TRANSFERRED,
      ...getChequeIdHelper(chequeId, false),
    });
  };

  // -----------------------------PERSONAL CHEQUE FUNCTIONS--------------------------------- //

  // pass personal cheque
  const handlePassPersonalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.PERSONAL.PASS,
      ...getChequeIdHelper(chequeId, true),
    });
  };

  // pass cancel personal cheque
  const handleCancelPersonalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.PERSONAL.CANCEL,
      ...getChequeIdHelper(chequeId, true),
    });
  };

  // return personal cheque from party
  const handleReturnPersonalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.PERSONAL.RETURN,
      ...getChequeIdHelper(chequeId, true),
    });
  };

  // reissue personal cheque to a party
  const handleReissueReturnedPersonalCheque = (chequeId) => {
    setChequeActionState({
      actionType: ACTION_TYPES.PERSONAL.RE_ISSUE,
      ...getChequeIdHelper(chequeId, true),
    });
  };

  // // clear external transferred cheque
  // const handlePassExternalTransferredCheque = (chequeId) => {};

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
        {
          action: handleCancelPersonalCheque,
          name: "Cancel personal cheque",
        },
      ],
      cleared: [],
      cancelled: [],
    },
    EXTERNAL: {
      pending: [
        {
          action: handleTransferExternalCheque,
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
          action: handleReturnExternalTransferredCheque,
          name: "Return transferred cheque",
        },
        // {
        //   action: handlePassExternalTransferredCheque,
        //   name: "Clear transferred cheque",
        // },
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
        chequeSerial={chequeSerial}
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
      <ChequeActions
        {...chequeActionState}
        onClose={() =>
          setChequeActionState({
            actionType: null,
            open: false,
            chequeId: null,
            isPersonal: false,
          })
        }
      />
    </div>
  );
};

export default ChequeActionMenu;
