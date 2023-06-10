// React
import React, { useEffect, useState } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Custom Components
import RawReceipt from '../common/RawReceipt';

// MUI
import { Typography } from '@mui/material';

// Utils
import axiosInstance from '../../../../utils/axiosApi';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';

const RawDebitReceipt = ({ persons, warehouses, rawProducts }) => {
  const { uuid } = useParams();
  const [transaction, setTransaction] = useState(null);

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        `${RAW_APIS.LIST.RAW_DEBIT_TRANSACTION}?id=${uuid}`,
      );
      if (response?.data?.results?.length) {
        setTransaction(response.data.results[0]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (uuid) {
      fetchTransaction();
    }
  }, [uuid]);

  return (
    <>
      {transaction ? (
        <RawReceipt
          transaction={transaction}
          persons={persons}
          rawProducts={rawProducts}
          warehouses={warehouses}
          receiptType={'Sale/Return'}
        />
      ) : (
        <Typography variant="body1">Loading transaction...</Typography>
      )}
    </>
  );
};

export default RawDebitReceipt;
