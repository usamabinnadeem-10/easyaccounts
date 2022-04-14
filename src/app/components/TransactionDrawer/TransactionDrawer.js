import React from 'react';

import ViewSingleTransaction from '../../containers/ViewSingleTransaction';
import CustomDrawer from '../../components/CustomDrawer';

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
  return (
    <CustomDrawer onClose={hideDrawer} open={open}>
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
    </CustomDrawer>
  );
}

export default TransactionDrawer;
