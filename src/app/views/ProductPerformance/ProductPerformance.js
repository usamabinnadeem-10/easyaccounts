import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import Heading from '../../components/Heading';
import Printable from '../../containers/Printable';

import * as utils from './utils';
import * as constants from './constants';
import { REPORTS_APIS } from '../../../constants/restEndPoints';

import { cacheProductPerformance } from '../../../store/cache';

const ProductPerformance = (props) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const productPerformanceCache = useSelector(
    (state) => state.cache.productPerformanceCache
  );
  const [performanceData, setPerformanceData] = React.useState(
    productPerformanceCache || []
  );

  const filters = React.useMemo(
    () => utils.getFilters(essentials),
    [essentials]
  );

  const onSearch = (data) => {
    let formattedData = utils.getTableData(data);
    setPerformanceData(formattedData);
    dispatch(cacheProductPerformance(formattedData));
  };

  return (
    <>
      <Heading heading={'Product Performance'} />
      <CustomFilters
        filters={filters}
        api={REPORTS_APIS.PRODUCT_PERFORMANCE_HISTORY}
        onSearch={onSearch}
      />
      <Printable
        disablePrint={performanceData?.length === 0}
        documentTitle='Product Performance'>
        {performanceData.length > 0 && (
          <CustomTable columns={constants.COLUMNS} data={performanceData} />
        )}
      </Printable>
    </>
  );
};

export default ProductPerformance;
