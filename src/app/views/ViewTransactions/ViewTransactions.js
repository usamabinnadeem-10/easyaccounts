import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';

import CustomFilters from '../../containers/CustomFilters';
import ConfirmationModal from '../../components/ConfirmationModal';
import TransactionDetail from '../../components/TransactionDetail';
import TransactionDrawer from '../../components/TransactionDrawer';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';

import { SUCCESS, REDIRECTS, DIALOGUE_INIT } from './constants';
import { TRANSACTION_URLS } from '../../../constants/restEndPoints';
import {
  LoadMoreButton,
  DataGridWrapper,
  DetailsButtonContainer,
  DetailButton,
} from './styled';

import instance from '../../../utils/axiosApi';
import { getURL } from '../../utilities/stringUtils';
import { findErrorMessage } from '../../utilities/objectUtils';
import {
  formatTransactionData,
  formatTransactionDetails,
  formatTransactionWithTransactionDetails,
} from './utils';

import { getFilters } from './filters';

import { setShouldFetchDaybook } from '../../../store/accounts/actions';
import { setShouldFetch } from '../../../store/transactions';

import { withSnackbar } from '../../hoc/withSnackbar';

import { cacheTransactionList } from '../../../store/cache';

function ViewTransactions({
  daybookView,
  defaultTransactions,
  accounts,
  persons,
  products,
  warehouses,
  showErrorSnackbar,
  showSuccessSnackbar,
}) {
  const state = useSelector((state) => state.essentials);
  const role = useSelector((state) => state.auth.userRole);
  const history = useHistory();
  const dispatch = useDispatch();

  const transactionListCache = useSelector(
    (state) => state.cache.transactionListCache,
  );

  const [transactionData, setTransactionData] = useState(
    daybookView
      ? formatTransactionData(defaultTransactions, persons)
      : transactionListCache.transactionData || [],
  );
  const [transactionDataRaw, setTransactionDataRaw] = useState(
    daybookView
      ? defaultTransactions
      : transactionListCache.transactionDataRaw || [],
  );
  const [transactionDataWithDetails, setTransactionDataWithDetails] = useState(
    [],
  );

  const [dialogueState, setDialogueState] = useState({
    open: false,
    dialogueValue: null,
    deleteItem: false,
    idToDelete: null,
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPage, setNextPage] = useState(
    transactionListCache.nextPage || null,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showWithDetails, setShowWithDetails] = useState(false);

  useEffect(() => {
    let tId = dialogueState.idToDelete;
    if (dialogueState.dialogueValue && dialogueState.deleteItem) {
      instance
        .delete(
          getURL(
            TRANSACTION_URLS.DELETE_TRANSACTION,
            'uuid',
            dialogueState.idToDelete,
          ),
        )
        .then((response) => {
          showSuccessSnackbar('Deleted, please search again to refresh data');
          dispatch(setShouldFetchDaybook(true));
          dispatch(setShouldFetch(true));
          setDialogueState(DIALOGUE_INIT);
          showSuccessSnackbar(SUCCESS.DELETED);
          setTransactionData(transactionData.filter((t) => t.id !== tId));
          setTransactionDataRaw(transactionDataRaw.filter((t) => t.id !== tId));
        })
        .catch((error) => {
          setDialogueState(DIALOGUE_INIT);
          showErrorSnackbar(findErrorMessage(error.response.data));
        });
    }
  }, [dialogueState]);

  useEffect(() => {
    if (showWithDetails) {
      setTransactionDataWithDetails(
        formatTransactionWithTransactionDetails(transactionDataRaw, {
          persons,
          products,
          warehouses,
        }),
      );
    }
  }, [transactionDataRaw, showWithDetails]);

  const handleFormattingTransactions = (data, isLoadMore = false) => {
    let formattedTransactions = isLoadMore
      ? formatTransactionData([...transactionDataRaw, ...data.results], persons)
      : formatTransactionData(data.results, persons);
    let raw = data.results;
    if (isLoadMore) {
      raw = [...transactionDataRaw, ...raw];
    }
    setNextPage(data.next);
    setTransactionData(formattedTransactions);
    setTransactionDataRaw(raw);
    setIsEmpty(formattedTransactions.length === 0);

    dispatch(
      cacheTransactionList({
        transactionData: formattedTransactions,
        transactionDataRaw: raw,
        nextPage: data.next,
      }),
    );
  };

  const hideDrawer = () => {
    setShowDrawer(false);
  };

  const onRowClick = (id) => {
    let transaction = transactionDataRaw.filter(
      (element) => element.id === id,
    )[0];
    setCurrentTransaction(transaction);
    setShowDrawer(true);
  };

  const handleEdit = (id) => {
    let transactionToEdit = transactionDataRaw.filter(
      (transaction) => transaction.id === id,
    )[0];
    let account = accounts?.[transactionToEdit.account_type];
    let person = persons[transactionToEdit.person];
    history.push({
      pathname: REDIRECTS[transactionToEdit.serial_type],
      state: {
        transaction: {
          ...transactionToEdit,
          person: person,
          date: transactionToEdit.date,
          transaction_detail: formatTransactionDetails(
            transactionToEdit.transaction_detail,
            products,
            warehouses,
          ),
        },
        account_type: account,
        paid_amount: transactionToEdit.paid_amount,
      },
    });
  };

  const handleDelete = (id) => {
    setDialogueState({
      ...dialogueState,
      open: true,
      deleteItem: true,
      idToDelete: id,
    });
  };

  const loadMoreData = () => {
    setIsLoadingMore(true);
    instance
      .get(nextPage)
      .then((response) => {
        handleFormattingTransactions(response.data, true);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        setIsLoadingMore(false);
        showErrorSnackbar('Error loading data');
      });
  };

  return (
    <>
      <ConfirmationModal
        open={dialogueState.open}
        setDialogueState={(value) =>
          setDialogueState({ ...dialogueState, ...value })
        }
        closeDialogue={() =>
          setDialogueState({ ...dialogueState, open: false })
        }
      />
      {!daybookView && (
        <div>
          <Heading heading="View Transactions" />
          <CustomFilters
            api={TRANSACTION_URLS.FILTER}
            onSearch={(data) => handleFormattingTransactions(data)}
            filters={getFilters(state, role)}
          />
        </div>
      )}
      {!daybookView && transactionDataRaw.length > 0 ? (
        <DetailsButtonContainer>
          <DetailButton
            size="small"
            variant="text"
            onClick={() => setShowWithDetails(!showWithDetails)}
          >
            {showWithDetails ? 'Hide detail' : 'Show details'}
          </DetailButton>
        </DetailsButtonContainer>
      ) : (
        <></>
      )}
      <DataGridWrapper>
        {transactionData.length > 0 && (
          <TransactionDetail
            rows={
              showWithDetails ? transactionDataWithDetails : transactionData
            }
            onRowClick={onRowClick}
            hoverProperty={'id'}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showWithDetails={showWithDetails}
          />
        )}
      </DataGridWrapper>
      {!daybookView && nextPage && (
        <LoadMoreButton
          variant="contained"
          fullWidth
          loading={isLoadingMore}
          onClick={() => loadMoreData()}
        >
          LOAD MORE
        </LoadMoreButton>
      )}
      {isEmpty && <Empty />}
      <TransactionDrawer
        dontFetch
        transactionData={currentTransaction}
        hideDrawer={hideDrawer}
        open={showDrawer}
        warehouses={warehouses}
        products={products}
        accounts={accounts}
        persons={persons}
      />
    </>
  );
}

export default withSnackbar(ViewTransactions);
