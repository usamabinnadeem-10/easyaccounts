import React from "react";

import ViewSingleTransaction from "../../containers/ViewSingleTransaction/ViewSingleTransaction";

import { Drawer } from "@mui/material";

import { useStyles } from "./styles";

function TransactionDrawer({
  hideDrawer,
  open,
  transactionID,
  dontFetch = false,
  transactionData = null,
  warehouses,
  products,
  persons,
  accounts,
}) {
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
      {open && (
        <ViewSingleTransaction
          dontFetch={dontFetch}
          transactionData={transactionData}
          transactionID={transactionID}
          warehouses={warehouses}
          products={products}
          persons={persons}
          accounts={accounts}
        />
      )}
    </Drawer>
  );
}

export default TransactionDrawer;
