import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import PaymentTable from './PaymentTable';

import { getFilters } from './filters';
import { PAYMENT_APIS } from '../../../constants/restEndPoints';

const PaymentList = ({ ...props }) => {
  const essentials = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);

  const [paymentData, setPaymentData] = useState([]);

  const handleSearch = (data) => {
    setPaymentData(data.results);
  };

  return (
    <>
      <CustomFilters
        onSearch={handleSearch}
        api={PAYMENT_APIS.LIST.PAYMENT}
        filters={getFilters(essentials, role)}
      />
      {paymentData.length > 0 && (
        <PaymentTable
          rows={paymentData}
          handleDelete={() => {}}
          handleEdit={() => {}}
          handleView={() => {}}
          {...props}
        />
      )}
    </>
  );
};

export default PaymentList;
