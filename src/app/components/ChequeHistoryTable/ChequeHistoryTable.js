import React from 'react';

import CustomTable from '../CustomTable';

import { formatHistoryData } from './utils';
import { COLUMNS } from './constants';

const ChequeHistoryTable = ({ historyData, accounts, persons }) => {
  return (
    <CustomTable
      columns={COLUMNS}
      data={formatHistoryData(historyData, accounts, persons)}
    />
  );
};

export default ChequeHistoryTable;
