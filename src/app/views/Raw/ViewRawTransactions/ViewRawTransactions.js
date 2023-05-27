// React
import React, { useEffect, useCallback, useMemo, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawTransactionsList } from '../../../../store/cache';

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

const ListRawTransactions = () => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const rawTransactionsCache = useSelector(
    (state) => state.cache.rawTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawTransactions, setRawTransactions] = useState([]);

  let filters = useMemo(() => getFilters(essentials), [essentials]);

  useEffect(() => {
    setRawTransactions(
      formatTransactionData(rawTransactionsCache.transactionData, essentials),
    );
  }, [rawTransactionsCache, essentials]);

  const onSearch = (data) => {
    console.log(data);
    dispatch(
      cacheRawTransactionsList({
        transactionData: data.results,
        next: data.next,
      }),
    );
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(rawTransactionsCache.next);
      if (response.data) {
        const data = response.data;
        dispatch(
          cacheRawTransactionsList({
            transactionData: [
              ...rawTransactionsCache.transactionData,
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
      <Heading heading="Kora Purchase List" />
      <CustomFilters
        api={RAW_APIS.LIST.RAW_TRANSACTION}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid columns={COLUMNS} rows={rawTransactions} showToolbar />
        <LoadingButton
          onClick={loadMore}
          disabled={rawTransactionsCache.next}
          loading={loading}
        >
          Load More
        </LoadingButton>
      </GridWrapper>
    </>
  );
};

export default withSnackbar(ListRawTransactions);
