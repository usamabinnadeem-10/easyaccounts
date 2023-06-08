// React
import React, { useEffect, useCallback, useMemo } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRawStock } from '../../../../store/raw/actions';

// Custom components
import CustomDataGrid from '../../../containers/DataGrid/DataGrid';
import Heading from '../../../components/Heading/Heading';
import CustomFilters from '../../../containers/CustomFilters/CustomFilters';

// Utils
import axiosApi from '../../../../utils/axiosApi';
import { withSnackbar } from '../../../hoc/withSnackbar';
import { formatStockData } from './utils';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';
import { COLUMNS } from './constants';

// Styled
import { GridWrapper } from './styled';

// Filters
import { getFilters } from './filters';

const RawStock = () => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const stockData = useSelector((state) => state.raw.stock);

  const fetchStock = useCallback(async () => {
    const response = await axiosApi.get(RAW_APIS.STOCK);
    if (response.data) {
      dispatch(setRawStock(response.data));
    }
  }, [dispatch]);

  useEffect(() => {
    if (stockData.refetch) {
      fetchStock();
    }
  }, [stockData, fetchStock]);

  const stockFormatted = useMemo(
    () =>
      formatStockData(stockData.data, {
        ...essentials,
      }),
    [stockData, essentials],
  );

  const onSearch = (data) => {
    dispatch(setRawStock(data));
  };

  let filters = useMemo(() => getFilters(essentials), [essentials]);

  return (
    <>
      <Heading heading="Kora Stock" />
      <CustomFilters
        api={RAW_APIS.STOCK}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid columns={COLUMNS} rows={stockFormatted} showToolbar />
      </GridWrapper>
    </>
  );
};

export default withSnackbar(RawStock);
