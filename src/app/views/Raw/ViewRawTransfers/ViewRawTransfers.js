// React
import React, { useEffect, useMemo, useState } from 'react';

// React Router
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawTransferTransactionsList } from '../../../../store/cache';
import { openModal } from '../../../../store/modals';

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

const ListRawTransfers = ({ showSuccessSnackbar, showErrorSnackbar }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const rawTransfersCache = useSelector(
    (state) => state.cache.rawTransferTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawTransfers, setRawTransfers] = useState([]);

  let filters = useMemo(() => getFilters(), []);

  useEffect(() => {
    setRawTransfers(
      formatTransactionData(rawTransfersCache.transactionData, essentials),
    );
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

  const handleEdit = (uuid) => {
    history.push(`/home/raw-transfer/${uuid}`);
  };

  const handleDeleteConfirm = async (uuid) => {
    try {
      await axiosApi.delete(RAW_APIS.DELETE.transfer(uuid));
      showSuccessSnackbar('Transfer deleted');
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
