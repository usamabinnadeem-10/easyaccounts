import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useHistory } from "react-router";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";

import AddModal from "../AddModal/AddModal";
import SkeletonIconButton from "../../components/SkeletonIconButton";

import { chooseModal } from "./constants";
import { SIDEBAR } from "./constants";
import { DRAWER_WIDTH } from "./constants";
import { paperWhite } from "../../../constants/colors";

import { getIcon } from "./utils";
import { BranchInfo } from "./styled";
import { BranchName } from "./styled";

import { logout } from "../../../store/auth";

const SideBar = ({ fetched }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const activeBranch = useSelector((state) => state.auth.activeBranch);

  const [open, setOpen] = useState({
    panel: 0,
    expand: false,
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState([]);

  const handleOpen = (panel) => {
    setOpen({
      panel: panel,
      expand: panel === open.panel ? !open.expand : true,
    });
  };

  const handleOpenAddModal = (name) => {
    setForm(chooseModal(name, essentials));
    setIsAddModalOpen(true);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddModal
          open={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          form={form}
        />
      )}
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
                        <ListItemButton
                          disabled={!fetched}
                          onClick={
                            panelData.route
                              ? () => history.push(panelData.route)
                              : () => handleOpenAddModal(panelData.modal)
                          }
                          key={index}
                          sx={{ pl: 4 }}
                          disableRipple
                        >
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
        <BranchInfo>
          <BranchName variant="body1">
            {activeBranch?.branch_name || ""}
          </BranchName>
          <SkeletonIconButton
            loading={!fetched}
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutIcon />
          </SkeletonIconButton>
        </BranchInfo>
      </Drawer>
    </>
  );
};

export default SideBar;
