import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import PaymentTable from './PaymentTable';
import PaymentReceiptDrawer from './PaymentReceiptDrawer';
import Payment from '../Payment';

import { NATURES } from './constants';
import { getFilters } from './filters';
import { deletePaymentApi } from './api';

import { PAYMENT_APIS } from '../../../constants/restEndPoints';
import { withConfirmation } from '../../hoc/withConfirmation';

const PaymentList = ({
  daybookView = false,
  daybookPayments = null,
  ...props
}) => {
  const essentials = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);

  const [paymentData, setPaymentData] = useState(daybookPayments || []);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = (data) => {
    setPaymentData(data.results);
  };

  const filterSelectedPayment = (paymentId) => {
    return paymentData.filter((p) => p.id === paymentId)[0];
  };

  const toggleDrawer = () => {
    // if drawer is closing then set current payment to null
    if (showDrawer) {
      setCurrentPayment(null);
    }
    setShowDrawer(!showDrawer);
  };

  // show a single payment in a drawer
  const handleViewPayment = (paymentId) => {
    setCurrentPayment(filterSelectedPayment(paymentId));
    toggleDrawer();
  };

  // set editing true and show the Payment component for editing
  const handleEditPayment = (paymentId) => {
    let payment = filterSelectedPayment(paymentId);
    payment = {
      ...payment,
      person: props.persons?.[payment.person],
      account_type: props.accounts?.[payment.account_type],
      nature: NATURES[payment.nature],
    };
    setCurrentPayment(payment);
    setIsEditing(true);
  };

  // close the editing panel
  const handleCloseEditing = () => {
    setIsEditing(false);
    setCurrentPayment(null);
  };

  const confirmDeletion = (paymentId) => {
    deletePaymentApi(paymentId)
      .then((response) => {
        setPaymentData(paymentData.filter((p) => p.id !== paymentId));
      })
      .then((response) => {
        props.resetConfirmation();
      });
  };

  const handleDeletePayment = (paymentId) => {
    props.askForConfirmation(paymentId);
  };

  useEffect(() => {
    if (props.confirmed && props.confirmId) {
      confirmDeletion(props.confirmId);
    }
  }, [props.confirmed, props.confirmId]);

  return (
    <>
      {!isEditing && (
        <>
          {!daybookView && (
            <CustomFilters
              onSearch={handleSearch}
              api={PAYMENT_APIS.LIST.PAYMENT}
              filters={getFilters(essentials, role)}
            />
          )}

          {paymentData.length > 0 && (
            <PaymentTable
              rows={paymentData}
              handleDelete={handleDeletePayment}
              handleEdit={handleEditPayment}
              handleView={handleViewPayment}
              {...props}
            />
          )}
          <PaymentReceiptDrawer
            open={showDrawer}
            onClose={toggleDrawer}
            paymentData={currentPayment}
            {...props}
          />
        </>
      )}

      {isEditing && currentPayment && (
        <Payment
          edit
          editData={currentPayment}
          handleCloseEditing={handleCloseEditing}
        />
      )}
    </>
  );
};

export default withConfirmation(PaymentList);
