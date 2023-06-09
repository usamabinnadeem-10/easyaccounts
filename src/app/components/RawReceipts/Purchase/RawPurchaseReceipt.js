// React
import React, { useEffect, useState } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Custom Components
import LotRenderer from '../common/LotRenderer';

// MUI
import { Typography } from '@mui/material';

// Styled
import { Wrapper } from './styled';

// Utils
import axiosInstance from '../../../../utils/axiosApi';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';

const RawPurchaseReceipt = ({ persons, warehouses, rawProducts }) => {
  const { uuid } = useParams();
  const [transaction, setTransaction] = useState(null);

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        `${RAW_APIS.LIST.RAW_TRANSACTION}?id=${uuid}`,
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
    <Wrapper elevation={1}>
      {transaction ? (
        <LotRenderer
          transaction={transaction}
          persons={persons}
          rawProducts={rawProducts}
          warehouses={warehouses}
        />
      ) : (
        <Typography variant="body1">Loading transaction...</Typography>
      )}
    </Wrapper>
  );
};

export default RawPurchaseReceipt;
