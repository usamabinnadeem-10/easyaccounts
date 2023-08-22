import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import AddModal from '../AddModal/AddModal';
import PermissionGate from '../../components/PermissionGate';
import SkeletonIconButton from '../../components/SkeletonIconButton';

import { chooseModal } from './constants';
import { SIDEBAR } from './constants';
import { DRAWER_WIDTH } from './constants';
import { paperWhite } from '../../../constants/colors';

import { getIcon } from './utils';
import { BranchInfo } from './styled';
import { BranchName } from './styled';

import { logout } from '../../../store/auth';

import { withSnackbar } from '../../hoc/withSnackbar';

const SideBar = ({
  fetched,
  showErrorSnackbar,
  showSuccessSnackbar,
  tablet,
}) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const dying = useSelector((state) => state.dying);
  const raw = useSelector((state) => state.raw);
  const transactions = useSelector((state) => state.transactions);
  const activeBranch = useSelector((state) => state.auth.activeBranch);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState({
    panel: 0,
    expand: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (
      essentials.adding ||
      raw.adding ||
      dying.adding ||
      transactions.adding
    ) {
      setIsLoading(true);
    }
    if (essentials.added || raw.added || dying.added || transactions.added) {
      setIsLoading(false);
      showSuccessSnackbar('Added successfully');
      setIsAddModalOpen(false);
    }
    if (
      (essentials.error && !essentials.added) ||
      (raw.error && !raw.added) ||
      (dying.error && !dying.added) ||
      (transactions.error && !transactions.added)
    ) {
      setIsLoading(false);
      showErrorSnackbar(
        essentials.error || raw.error || dying.error || transactions.error,
      );
    }
  }, [essentials, dying, raw, transactions]);

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

  const handleListItemClick = (panelData) => {
    panelData.route
      ? history.push(panelData.route)
      : handleOpenAddModal(panelData.modal);
    tablet && setIsDrawerOpen(false);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddModal
          isLoading={isLoading}
          open={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          form={form}
        />
      )}
      {tablet && (
        <Grid container>
          <Fab sx={{ mt: 1, ml: 1 }} size="small">
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <MenuIcon color="primary" />
            </IconButton>
          </Fab>
        </Grid>
      )}
      <Drawer
        open={tablet ? isDrawerOpen : true}
        onClose={() => setIsDrawerOpen(false)}
        variant={tablet ? 'temporary' : 'permanent'}
        sx={{
          '& .MuiDrawer-paper': {
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
                  {/* <ListItemIcon>{getIcon(panel.panelName)}</ListItemIcon> */}
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
                        <PermissionGate
                          key={index}
                          permissions={panelData.permissions}
                          roles={panelData.roles}
                        >
                          <ListItemButton
                            disabled={!fetched}
                            onClick={() => handleListItemClick(panelData)}
                            key={index}
                            sx={{ pl: 4 }}
                            disableRipple
                          >
                            {/* <ListItemIcon>
                                {getIcon(panelData.name)}
                              </ListItemIcon> */}
                            <ListItemText primary={panelData.name} />
                          </ListItemButton>
                        </PermissionGate>
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
            {activeBranch?.branch_name || ''}
          </BranchName>
          <SkeletonIconButton
            loading={false}
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

export default withSnackbar(SideBar);
