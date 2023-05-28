// React
import React, { useEffect, useCallback, useMemo, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawDebitTransactionsList } from '../../../../store/cache';

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
  const rawDebitTransactionList = useSelector(
    (state) => state.cache.rawDebitTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawDebitTransactions, setRawDebitTransactions] = useState([]);

  let filters = useMemo(() => getFilters(essentials), [essentials]);

  useEffect(() => {
    setRawDebitTransactions(
      formatTransactionData(
        rawDebitTransactionList.transactionData,
        essentials,
      ),
    );
  }, [rawDebitTransactionList, essentials]);

  const onSearch = (data) => {
    dispatch(
      cacheRawDebitTransactionsList({
        transactionData: data.results,
        next: data.next,
      }),
    );
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(rawDebitTransactionList.next);
      if (response.data) {
        const data = response.data;
        dispatch(
          cacheRawDebitTransactionsList({
            transactionData: [
              ...rawDebitTransactionList.transactionData,
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
      <Heading heading="Kora Sale/Return List" />
      <CustomFilters
        api={RAW_APIS.LIST.RAW_DEBIT_TRANSACTION}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid
          columns={COLUMNS}
          rows={rawDebitTransactions}
          showToolbar
        />
        <LoadingButton
          onClick={loadMore}
          disabled={!rawDebitTransactionList.next}
          loading={loading}
        >
          Load More
        </LoadingButton>
      </GridWrapper>
    </>
  );
};

export default withSnackbar(ListRawTransactions);
