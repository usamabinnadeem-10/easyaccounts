import React, { useState } from 'react';

import { Box } from '@mui/system';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomDataGrid from '../../containers/DataGrid/DataGrid';
import Heading from '../../components/Heading';

import { filters } from './filters';
import { getTableData } from './utils';
import { REPORTS_APIS } from '../../../constants/restEndPoints';
import { columns } from './constants';

const RevenueByPeriod = () => {
  const [data, setData] = useState([]);

  const onSearch = (data) => {
    setData(getTableData(data));
  };

  return (
    <>
      <Heading heading={'Product Performance'} />
      <CustomFilters
        filters={filters}
        api={REPORTS_APIS.REVENUE_BY_PERIOD}
        onSearch={onSearch}
      />
      <Box sx={{ w: 1, height: '600px' }}>
        <CustomDataGrid rows={data} columns={columns} />
      </Box>
    </>
  );
};

export default RevenueByPeriod;
