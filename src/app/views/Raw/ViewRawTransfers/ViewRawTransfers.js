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
import RawReceiptDrawer from '../../../components/RawReceipts/RawReceiptDrawer';

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

const ViewRawTransfers = ({
  showSuccessSnackbar,
  showErrorSnackbar,
  ...props
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const rawTransfersCache = useSelector(
    (state) => state.cache.rawTransferTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawTransfers, setRawTransfers] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState(null);

  let filters = useMemo(() => getFilters(), []);

  useEffect(() => {
    setRawTransfers(formatTransactionData(rawTransfersCache.transactionData));
  }, [rawTransfersCache, essentials]);

  const onSearch = (data) => {
    dispatch(
      cacheRawTransferTransactionsList({
        transactionData: data.results,
        next: data.next,
      }),
    );
  };

  const handleUpdateCache = (transactionData, next) => {
    dispatch(
      cacheRawTransferTransactionsList({
        transactionData: [
          ...rawTransfersCache.transactionData,
          ...transactionData,
        ],
        ...(next && { next }),
      }),
    );
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(rawTransfersCache.next);
      if (response.data) {
        const data = response.data;
        handleUpdateCache(data.results, data.next);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = (uuid) => {
    history.push(`/home/raw-transfer/${uuid}`);
  };

  const deleteRowFromGrid = (uuid) => {
    setRawTransfers(rawTransfers.filter((t) => t.id !== uuid));
    const updatedTransactionCache = rawTransfersCache?.transactionData?.filter(
      (t) => t.id !== uuid,
    );
    handleUpdateCache(updatedTransactionCache);
  };

  const handleDeleteConfirm = async (uuid) => {
    try {
      await axiosApi.delete(RAW_APIS.DELETE.transfer(uuid));
      deleteRowFromGrid(uuid);
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

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelected(null);
  };

  const handleClickRow = (transaction) => {
    setSelected(transaction);
    setShowDrawer(true);
  };

  return (
    <>
      <RawReceiptDrawer
        open={showDrawer && selected}
        onClose={handleCloseDrawer}
        receiptProps={{
          ...props,
          receiptType: 'transfer',
          transaction: selected,
        }}
      />
      <Heading heading="Kora Transfer List" />
      <CustomFilters
        api={RAW_APIS.LIST.TRANSFER}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid
          onRowClick={(row) => handleClickRow(row)}
          columns={COLUMNS}
          rows={rawTransfers}
          showToolbar
        />
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

export default withSnackbar(ViewRawTransfers);
