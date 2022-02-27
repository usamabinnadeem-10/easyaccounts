import React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChequeActionMenu = ({ chequeId, chequeStatus, actions }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {actions[chequeStatus].length > 0 && (
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {actions[chequeStatus].map((action, index) => (
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
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default ChequeActionMenu;
