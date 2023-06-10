import React, { useMemo } from 'react';

// Custom Table
import CustomTable from '../../../CustomTable/CustomTable';

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
  LotHeadWrapper,
} from './styled';

import { getMeta, getLotTableData } from './utils';
import { COLUMNS } from './constants';

const RawReceipt = ({
  persons,
  transaction,
  rawProducts,
  warehouses,
  receiptType,
}) => {
  const metaFields = useMemo(
    () => (transaction ? getMeta(transaction, persons) : null),
    [transaction, persons],
  );

  return (
    <Wrapper elevation={1}>
      <Typography variant="h6" gutterBottom>
        Kora {receiptType}
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
        {transaction.lots.map((lot) => (
          <LotWrapper key={lot.id}>
            <LotHeadWrapper>
              <Typography fontWeight={700} variant="h6" color={'GrayText'}>
                Lot # {lot.lot_number}
              </Typography>
              <Typography fontWeight={700} variant="h6">
                {rawProducts?.[lot.raw_product]?.label}
              </Typography>
            </LotHeadWrapper>
            <CustomTable
              columns={COLUMNS}
              data={getLotTableData(lot.lot_detail, warehouses)}
              noTableStyles
            />
          </LotWrapper>
        ))}
      </AllLotsWrapper>
    </Wrapper>
  );
};

export default RawReceipt;
