import React from 'react';

import { Typography } from '@mui/material';

import CustomTable from '../../components/CustomTable';
import Printable from '../../containers/Printable';

import { COLUMNS } from './constants';
import { formatTransferDetail } from './utils';
import { Meta } from './styled';
import { getReadableDate } from '../../utilities/stringUtils';

const ViewSingleTransfer = ({ data, ...props }) => {
  const TEXTS = [
    { name: 'Serial', value: data.serial },
    { name: 'Book #', value: data.manual_serial },
    {
      name: 'From Warehouse',
      value: props.warehouses[data.from_warehouse].label,
    },
    { name: 'Date', value: getReadableDate(data.date) },
  ];

  return (
    <Printable
      documentTitle={`${TEXTS[2].value} T-${TEXTS[0].value} Book ${TEXTS[1].value}`}>
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
    </Printable>
  );
};

export default ViewSingleTransfer;
