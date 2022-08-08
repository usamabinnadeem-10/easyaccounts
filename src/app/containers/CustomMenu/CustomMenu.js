import React from 'react';
import { useState } from 'react';

import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import CustomIconButton from '../../components/CustomIconButton';

const CustomMenu = ({ menu, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomIconButton size='small' onClick={handleOpenMenu}>
        <MoreVertIcon />
      </CustomIconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {menu.map((menuItem, index) => (
          <MenuItem
            disableRipple
            key={index}
            onClick={() => {
              menuItem.action(id);
              handleCloseMenu();
            }}>
            {menuItem.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomMenu;
