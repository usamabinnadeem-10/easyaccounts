// React
import React, { useEffect, useCallback, useMemo, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawTransferTransactionsList } from '../../../../store/cache';

// Custom components
import CustomDataGrid from '../../../containers/DataGrid/DataGrid';
import Heading from '../../../components/Heading/Heading';
import CustomFilters from '../../../containers/CustomFilters/CustomFilters';

// MUI
import { LoadingButton } from '@mui/lab';

// Utils
import axiosApi from '../../../../utils/axiosApi';
import { withSnackbar } from '../../../hoc/withSnackbar';
import { formatTransactionData } from './utils';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';
import { COLUMNS } from './constants';

// Styled
import { GridWrapper } from './styled';

// Filters
import { getFilters } from './filters';

const ListRawTransfers = () => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const rawTransfersCache = useSelector(
    (state) => state.cache.rawTransferTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawTransfers, setRawTransfers] = useState([]);

  let filters = useMemo(() => getFilters(), []);

  useEffect(() => {
    console.log(rawTransfersCache.transactionData);
    // setRawTransfers(
    //   formatTransactionData(rawTransfersCache.transactionData, essentials),
    // );
  }, [rawTransfersCache, essentials]);

  const onSearch = (data) => {
    dispatch(
      cacheRawTransferTransactionsList({
        transactionData: data.results,
        next: data.next,
      }),
    );
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(rawTransfersCache.next);
      if (response.data) {
        const data = response.data;
        dispatch(
          cacheRawTransferTransactionsList({
            transactionData: [
              ...rawTransfersCache.transactionData,
              ...data.results,
            ],
            next: data.next,
          }),
        );
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading heading="Kora Transfer List" />
      <CustomFilters
        api={RAW_APIS.LIST.TRANSFER}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid columns={COLUMNS} rows={rawTransfers} showToolbar />
        <LoadingButton
          onClick={loadMore}
          disabled={!rawTransfersCache.next}
          loading={loading}
        >
          Load More
        </LoadingButton>
      </GridWrapper>
    </>
  );
};

export default withSnackbar(ListRawTransfers);
