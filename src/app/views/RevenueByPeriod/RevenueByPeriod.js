import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomDataGrid from '../../containers/DataGrid/DataGrid';
import Heading from '../../components/Heading';
import { RevenueDocument } from './Document';

import { filters } from './filters';
import { getTableData } from './utils';
import { REPORTS_APIS } from '../../../constants/restEndPoints';
import { columns } from './constants';

import { usePDF, PDFDownloadLink } from '@react-pdf/renderer';

const RevenueByPeriod = () => {
  const [data, setData] = useState([]);

  const onSearch = (data) => {
    setData(getTableData(data));
  };

  return (
    <>
      <Heading heading={'Sale Ledger'} />
      <CustomFilters
        filters={filters}
        api={REPORTS_APIS.REVENUE_BY_PERIOD}
        onSearch={onSearch}
      />
      <Box sx={{ display: 'flex', w: 1, justifyContent: 'flex-end', mb: 1 }}>
        <PDFDownloadLink document={<RevenueDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </Box>
      <Box sx={{ w: 1, height: '600px' }}>
        <CustomDataGrid rows={data} columns={columns} />
      </Box>
    </>
  );
};

export default RevenueByPeriod;
