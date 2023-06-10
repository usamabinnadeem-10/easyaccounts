import React from 'react';

import CustomDrawer from '../../CustomDrawer';
import RawReceipt from '../common/RawReceipt';

const RawReceiptDrawer = ({ open, onClose, receiptProps }) => {
  return (
    <CustomDrawer onClose={onClose} open={open}>
      <RawReceipt {...receiptProps} />
    </CustomDrawer>
  );
};

export default RawReceiptDrawer;
