import React from "react";
import { useState } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { SIDEBAR } from "./constants";
import { DRAWER_WIDTH } from "./constants";
import { paperWhite } from "../../../constants/colors";

import { getIcon } from "./utils";

const SideBar = () => {
  const [open, setOpen] = useState({
    panel: 0,
    expand: false,
  });

  const handleOpen = (panel) => {
    setOpen({
      panel: panel,
      expand: panel === open.panel ? !open.expand : true,
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          bgcolor: paperWhite,
          py: 2,
        },
      }}
    >
      <List disablePadding dense>
        {SIDEBAR.map((panel, index) => {
          return (
            <div key={index}>
              <ListItemButton onClick={() => handleOpen(index)} disableRipple>
                <ListItemIcon>{getIcon(panel.panelName)}</ListItemIcon>
                <ListItemText primary={panel.panelName} />
                {open.panel === index && open.expand ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={open.expand && open.panel === index}
                timeout="auto"
                unmountOnExit
              >
                <List
                  dense
                  component="div"
                  disablePadding
                  sx={{
                    mb: 1,
                  }}
                >
                  {panel.panelData.map((panelData, index) => {
                    return (
                      <ListItemButton key={index} sx={{ pl: 4 }} disableRipple>
                        <ListItemIcon>{getIcon(panelData.name)}</ListItemIcon>
                        <ListItemText primary={panelData.name} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;
