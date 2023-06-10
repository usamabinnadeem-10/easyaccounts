// React
import React, { useEffect, useMemo, useState } from 'react';

// React Router
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { cacheRawDebitTransactionsList } from '../../../../store/cache';
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

const ViewRawDebitTransactions = ({
  showSuccessSnackbar,
  showErrorSnackbar,
  ...props
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const rawDebitTransactionList = useSelector(
    (state) => state.cache.rawDebitTransactionsListCache,
  );

  const [loading, setLoading] = useState(false);
  const [rawDebitTransactions, setRawDebitTransactions] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState(null);

  let filters = useMemo(() => getFilters(essentials), [essentials]);

  useEffect(() => {
    setRawDebitTransactions(
      formatTransactionData(rawDebitTransactionList.transactionData, {
        ...props,
      }),
    );
  }, [rawDebitTransactionList, props]);

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

  const handleEdit = (uuid) => {
    history.push(`/home/raw-debit/${uuid}`);
  };

  const handleDeleteConfirm = async (uuid) => {
    try {
      await axiosApi.delete(RAW_APIS.DELETE.debitTransaction(uuid));
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

  const COLUMNS = useMemo(() => getColumns({ handleDelete, handleEdit }), []);

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
          receiptType: 'Sale/Return',
          transaction: selected,
        }}
      />
      <Heading heading="Kora Sale/Return List" />
      <CustomFilters
        api={RAW_APIS.LIST.RAW_DEBIT_TRANSACTION}
        filters={filters}
        onSearch={onSearch}
      />
      <GridWrapper>
        <CustomDataGrid
          onRowClick={(row) => handleClickRow(row)}
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

export default withSnackbar(ViewRawDebitTransactions);
