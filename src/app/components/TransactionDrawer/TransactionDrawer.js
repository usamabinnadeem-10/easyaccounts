import React from "react";

import ViewSingleTransaction from "../../containers/ViewSingleTransaction/ViewSingleTransaction";

import { Drawer } from "@mui/material";

import { useStyles } from "./styles";

function TransactionDrawer({ hideDrawer, open, transactionID }) {
  const classes = useStyles();
  return (
    <Drawer
      onClose={hideDrawer}
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawer,
      }}
    >
      {open && <ViewSingleTransaction transactionID={transactionID} />}
    </Drawer>
  );
}

export default TransactionDrawer;
