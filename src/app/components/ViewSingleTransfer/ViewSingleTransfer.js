import React from 'react';

import { Typography } from '@mui/material';

import CustomTable from '../../components/CustomTable';

import { COLUMNS } from './constants';
import { formatTransferDetail } from './utils';
import { Meta } from './styled';

const ViewSingleTransfer = ({ data, ...props }) => {
  const TEXTS = [
    { name: 'Serial', value: data.serial },
    { name: 'Book #', value: data.manual_invoice_serial },
    {
      name: 'From Warehouse',
      value: data.from_warehouse,
    },
    { name: 'Date', value: data.date },
  ];

  return (
    <>
      <Meta direction='column' container>
        {TEXTS.map((text, index) => (
          <Typography key={index} variant='body2'>
            {text.name} : {text.value}
          </Typography>
        ))}
      </Meta>
      <CustomTable
        columns={COLUMNS}
        data={formatTransferDetail(
          data.transfer_detail,
          props.warehouses,
          props.products
        )}
      />
    </>
  );
};

export default ViewSingleTransfer;
