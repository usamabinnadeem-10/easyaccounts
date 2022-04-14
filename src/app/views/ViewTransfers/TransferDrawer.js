import React from 'react';

import CustomDrawer from '../../components/CustomDrawer';
import ViewSingleTransfer from '../../components/ViewSingleTransfer';

const TransferDrawer = ({ open, onClose, data, ...props }) => {
  return (
    <CustomDrawer open={open} onClose={onClose}>
      <ViewSingleTransfer data={data} {...props} />
    </CustomDrawer>
  );
};

export default TransferDrawer;
