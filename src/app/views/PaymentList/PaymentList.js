import React from 'react';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import PaymentTable from './PaymentTable';
import PaymentReceiptDrawer from './PaymentReceiptDrawer';
import Payment from '../Payment';

import { Typography } from '@mui/material';

import { NATURES } from './constants';
import { getFilters } from './filters';
import { deletePaymentApi } from './api';

import { formatCurrency } from '../../utilities/stringUtils';

import { PAYMENT_APIS } from '../../../constants/restEndPoints';
import { withConfirmation } from '../../hoc/withConfirmation';

import { cachePaymentList } from '../../../store/cache';

const PaymentList = ({
  daybookView = false,
  daybookPayments = null,
  ...props
}) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const paymentListCache = useSelector((state) => state.cache.paymentListCache);
  const role = useSelector((state) => state.auth.userRole);

  const [paymentData, setPaymentData] = useState(
    daybookPayments || paymentListCache.paymentData || []
  );
  const [currentPayment, setCurrentPayment] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [totals, setTotals] = useState({
    credit: 0,
    debit: 0,
  });

  // set totals for payment debit and credit
  useEffect(() => {
    let credit = 0;
    let debit = 0;
    paymentData.forEach((payment) => {
      if (payment.nature === 'C') {
        credit += payment.amount;
      } else {
        debit += payment.amount;
      }
    });
    setTotals({
      credit,
      debit,
    });
  }, [paymentData]);

  const setCache = (paymentData) => {
    dispatch(
      cachePaymentList({
        paymentData,
      })
    );
  };

  const handleSearch = (data) => {
    let paymentData = data.results;
    setPaymentData(paymentData);
    setCache(paymentData);
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
        let filtered = paymentData.filter((p) => p.id !== paymentId);
        setPaymentData(filtered);
        setCache(filtered);
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
          {paymentData.length > 0 && (
            <>
              <Typography variant='body2'>
                Total Credit : {formatCurrency(totals.credit)}
              </Typography>
              <Typography variant='body2'>
                Total Debit : {formatCurrency(totals.debit)}
              </Typography>
            </>
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
