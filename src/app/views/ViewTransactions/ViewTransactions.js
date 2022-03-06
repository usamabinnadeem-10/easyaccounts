import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import { Button } from "@mui/material";

import CustomFilters from "../../containers/CustomFilters";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import TransactionDetail from "../../components/TransactionDetail/TransactionDetail";
import TransactionDrawer from "../../components/TransactionDrawer/TransactionDrawer";
import Empty from "../../components/Empty/Empty";

import { ERRORS, SUCCESS, REDIRECTS } from "./constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { useStyles } from "./styles";

import instance from "../../../utils/axiosApi";
import { getURL } from "../../utilities/stringUtils";
import {
  formatTransactionData,
  formatTransactionDetails,
  getFilters,
} from "./utils";
import { setShouldFetchDaybook } from "../../../store/accounts/actions";

import { withSnackbar } from "../../hoc/withSnackbar";

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
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);
  const history = useHistory();
  const dispatch = useDispatch();

  const [transactionData, setTransactionData] = useState(
    daybookView ? formatTransactionData(defaultTransactions) : []
  );
  const [transactionDataRaw, setTransactionDataRaw] = useState(
    daybookView ? defaultTransactions : []
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
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (dialogueState.dialogueValue && dialogueState.deleteItem) {
      instance
        .delete(
          getURL(
            TRANSACTION_URLS.DELETE_TRANSACTION,
            "uuid",
            dialogueState.idToDelete
          )
        )
        .then((response) => {
          showSuccessSnackbar("Deleted, please search again to refresh data");
          dispatch(setShouldFetchDaybook(true));
          showSuccessSnackbar(SUCCESS.DELETED);
        })
        .catch((error) => {
          showErrorSnackbar(ERRORS.OOPS);
        });
    }
  }, [dialogueState]);

  const handleFormattingTransactions = (data, isLoadMore = false) => {
    let formattedTransactions = formatTransactionData(data.results);
    let raw = data.results;
    if (isLoadMore) {
      formattedTransactions = [...transactionData, ...formattedTransactions];
      raw = [...transactionDataRaw, ...raw];
    }
    setNextPage(data.next);
    setTransactionData(formattedTransactions);
    setTransactionDataRaw(raw);
    setIsEmpty(formattedTransactions.length === 0);
  };

  const hideDrawer = () => {
    setShowDrawer(false);
  };

  const onRowClick = (id) => {
    let transaction = transactionDataRaw.filter(
      (element) => element.id === id
    )[0];
    setCurrentTransaction(transaction);
    setShowDrawer(true);
  };

  const handleEdit = (id) => {
    let transactionToEdit = transactionDataRaw.filter(
      (transaction) => transaction.id === id
    )[0];
    let account = accounts?.[transactionToEdit.account_type];
    let person = persons[transactionToEdit.person];
    history.push({
      pathname: REDIRECTS[person.person_type],
      state: {
        transaction: {
          ...transactionToEdit,
          person: person,
          date: transactionToEdit.date,
          transaction_detail: formatTransactionDetails(
            transactionToEdit.transaction_detail,
            products,
            warehouses
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
    instance.get(nextPage).then((response) => {
      handleFormattingTransactions(response, true);
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
          <CustomFilters
            api={TRANSACTION_URLS.FILTER}
            onSearch={(data) => handleFormattingTransactions(data)}
            filters={getFilters(state)}
          />
        </div>
      )}
      <div className={classes.table}>
        {transactionData.length > 0 && (
          <TransactionDetail
            rows={transactionData}
            onRowClick={onRowClick}
            hoverProperty={"id"}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
      {!daybookView && nextPage && (
        <Button fullWidth onClick={() => loadMoreData()}>
          LOAD MORE
        </Button>
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
