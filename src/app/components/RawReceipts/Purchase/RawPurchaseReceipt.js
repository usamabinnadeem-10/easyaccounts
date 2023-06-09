// React
import React, { useEffect, useState, useMemo } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Custom Table
import CustomTable from '../../CustomTable/CustomTable';

// MUI
import { Typography } from '@mui/material';

// Styled
import {
  Wrapper,
  MetaWrapper,
  MetaFieldWrapper,
  MetaKey,
  AllLotsWrapper,
  LotWrapper,
} from './styled';

// Utils
import axiosInstance from '../../../../utils/axiosApi';
import { getMeta, getLotTableData } from './utils';
import { COLUMNS } from './constants';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';

const RawPurchaseReceipt = ({ persons, warehouses }) => {
  const { uuid } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [tableData, setTableData] = useState(null);

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

  const metaFields = useMemo(
    () => (transaction ? getMeta(transaction, persons) : null),
    [transaction, persons],
  );

  useEffect(() => {
    if (uuid) {
      fetchTransaction();
    }
  }, [uuid]);

  return (
    <Wrapper elevation={1}>
      {transaction && metaFields ? (
        <>
          <Typography variant="h6" gutterBottom>
            Kora Purchase
          </Typography>
          <MetaWrapper>
            {metaFields.map((meta, idx) => (
              <MetaFieldWrapper key={idx}>
                <MetaKey variant="subtitle2">{meta.label}</MetaKey>
                <Typography fontWeight={700} variant="subtitle2">
                  {meta.value}
                </Typography>
              </MetaFieldWrapper>
            ))}
          </MetaWrapper>
          <AllLotsWrapper>
            {transaction.rawtransactionlot_set.map((lot) => (
              <LotWrapper key={lot.id}>
                <Typography fontWeight={700} variant="h6" color={'GrayText'}>
                  Lot # {lot.lot_number}
                </Typography>
                <CustomTable
                  columns={COLUMNS}
                  data={getLotTableData(lot.raw_lot_detail, warehouses)}
                  noTableStyles
                />
              </LotWrapper>
            ))}
          </AllLotsWrapper>
        </>
      ) : (
        <Typography variant="body1">Loading receipt...</Typography>
      )}
    </Wrapper>
  );
};

export default RawPurchaseReceipt;
