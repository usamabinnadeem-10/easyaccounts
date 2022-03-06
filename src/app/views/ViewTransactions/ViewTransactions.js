import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

import { Button } from "@mui/material";

import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import SearchAndSelect from "../../components/SearchAndSelect/SearchAndSelect";
import TransactionDetail from "../../components/TransactionDetail/TransactionDetail";
import TransactionDrawer from "../../components/TransactionDrawer/TransactionDrawer";
import Empty from "../../components/Empty/Empty";

import {
  PERSON_TYPES,
  STORE_PERSON,
} from "../../components/SelectPerson/constants";
import { ERRORS, SUCCESS, REDIRECTS } from "./constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { useStyles } from "./styles";

import instance from "../../../utils/axiosApi";
import { makeQueryParamURL } from "../../utilities/stringUtils";
import { getURL } from "../../utilities/stringUtils";
import { formatTransactionData, formatTransactionDetails } from "./utils";
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

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionData, setTransactionData] = useState(
    daybookView ? formatTransactionData(defaultTransactions) : []
  );
  const [transactionDataRaw, setTransactionDataRaw] = useState(
    daybookView ? defaultTransactions : []
  );
  const [loading, setLoading] = useState(false);
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
    setIsEmpty(false);
  }, [personType]);

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
          search();
          dispatch(setShouldFetchDaybook(true));
          showSuccessSnackbar(SUCCESS.DELETED);
        })
        .catch((error) => {
          showErrorSnackbar(ERRORS.OOPS);
        });
    }
  }, [dialogueState]);

  const handleFormattingTransactions = (response, isLoadMore = false) => {
    let formattedTransactions = formatTransactionData(response.data.results);
    let raw = response.data.results;
    if (isLoadMore) {
      formattedTransactions = [...transactionData, ...formattedTransactions];
      raw = [...transactionDataRaw, ...raw];
    }
    setNextPage(response.data.next);
    setTransactionData(formattedTransactions);
    setTransactionDataRaw(raw);
    setIsEmpty(formattedTransactions.length === 0);
    setLoading(false);
    setStartDate(null);
    setEndDate(null);
  };

  const search = () => {
    if (!currentPerson) {
      showErrorSnackbar(ERRORS.SELECT_PERSON + personType);
      return;
    }
    setLoading(true);
    const params = [
      {
        key: "person",
        value: currentPerson.value,
      },
      startDate && {
        key: "start",
        value: startDate,
      },
      endDate && {
        key: "end",
        value: endDate,
      },
    ];
    const URL = makeQueryParamURL(TRANSACTION_URLS.CREATE_TRANSACTION, params);

    instance
      .get(URL)
      .then((response) => {
        handleFormattingTransactions(response);
      })
      .catch((error) => {
        setLoading(false);
        showErrorSnackbar(ERRORS.OOPS);
      });
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
        <div className={classes.root}>
          <SearchAndSelect
            header="View Transactions"
            currentPerson={currentPerson}
            personType={personType}
            setCurrentPerson={setCurrentPerson}
            options={state[STORE_PERSON[personType]]}
            setPersonType={setPersonType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            loading={loading}
            search={search}
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
