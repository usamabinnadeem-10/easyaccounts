// React
import React, { useEffect, useMemo, useState } from 'react';

// React Router
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawTransactionsList } from '../../../../store/cache';
import { openModal, closeModal } from '../../../../store/modals';

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
import { findErrorMessage } from '../../../utilities/objectUtils';

// Constants
import { RAW_APIS } from '../../../../constants/restEndPoints';
import { getColumns } from './constants';
import { MODAL_IDS } from '../../../../constants/modalIds';

// Styled
import { GridWrapper } from './styled';

// Filters
import { getFilters } from './filters';

const ListRawTransactions = ({ showSuccessSnackbar, showErrorSnackbar }) => {
  const history = useHistory();
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

  const handleEdit = (uuid) => {
    history.push(`/home/raw-purchase/${uuid}`);
  };

  const handleDeleteConfirm = async (uuid) => {
    try {
      await axiosApi.delete(RAW_APIS.DELETE.transaction(uuid));
      showSuccessSnackbar('Transaction deleted');
    } catch (error) {
      showErrorSnackbar(findErrorMessage(error?.response?.data));
    }
  };

  const handleDelete = (uuid) => {
    dispatch(
      openModal(MODAL_IDS.CONFIRMATION, {
        onConfirm: () => handleDeleteConfirm(uuid),
      }),
    );
  };

  const COLUMNS = useMemo(() => getColumns({ handleEdit, handleDelete }), []);

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
          disabled={!rawTransactionsCache.next}
          loading={loading}
        >
          Load More
        </LoadingButton>
      </GridWrapper>
    </>
  );
};

export default withSnackbar(ListRawTransactions);
