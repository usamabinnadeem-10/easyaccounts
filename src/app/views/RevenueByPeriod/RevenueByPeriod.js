import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomDataGrid from '../../containers/DataGrid/DataGrid';
import Heading from '../../components/Heading';
import { RevenueDocument } from './Document';
import Test from './Test';

import { filters } from './filters';
import { getTableData } from './utils';
import { REPORTS_APIS } from '../../../constants/restEndPoints';
import { columns } from './constants';

import { pdf } from '@react-pdf/renderer';
import * as FileSaver from 'file-saver';

const RevenueByPeriod = () => {
  const [data, setData] = useState([]);

  const onSearch = (data) => {
    setData(getTableData(data));
  };

  const generatePdf = async (data) => {
    const fileData = {
      columns: ['period', 'sale'],
      // data: data.map((d) => ({
      //   ...d,
      //   period: d.period.format('DD-MM-YYYY'),
      // })),
      data: JSON.parse(data),
    };
    const blob = await pdf(<Test data={fileData} />).toBlob();
    FileSaver.saveAs(blob, 'test');
  };

  return (
    <>
      <Heading heading={'Sale Ledger'} />
      <CustomFilters
        filters={filters}
        api={REPORTS_APIS.REVENUE_BY_PERIOD}
        onSearch={onSearch}
      />
      <Box sx={{ w: 1, height: '600px' }}>
        <CustomDataGrid
          printable
          onClickPrint={(json) => generatePdf(json)}
          rows={data}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default RevenueByPeriod;
