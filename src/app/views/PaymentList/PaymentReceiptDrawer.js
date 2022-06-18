import React from 'react';

import CustomDrawer from '../../components/CustomDrawer';
import PaymentReceipt from '../../components/PaymentReceipt';

const PaymentReceiptDrawer = ({ open, onClose, paymentData, ...props }) => {
  return (
    <CustomDrawer open={open} onClose={onClose}>
      {paymentData && (
        <PaymentReceipt
          overridewidth={'100%'}
          paymentData={paymentData}
          {...props}
        />
      )}
    </CustomDrawer>
  );
};

export default PaymentReceiptDrawer;
