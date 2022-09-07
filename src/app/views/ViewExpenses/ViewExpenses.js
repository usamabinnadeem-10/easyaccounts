import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import ExpenseDetail from '../../components/ExpenseDetail/ExpenseDetail';
import AddModal from '../../containers/AddModal/AddModal';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';
import CustomFilters from '../../containers/CustomFilters';
import Printable from '../../containers/Printable';

import { getFilters } from './filters';
import { getExpenseForm } from '../../containers/FAB/constants';

import instance from '../../../utils/axiosApi';
import { getURL, convertDate } from '../../utilities/stringUtils';
import { EXPENSE_URLS } from '../../../constants/restEndPoints';
import { SUCCESS } from './constants';
import { formatExpensesData, getTotalExpenses } from './utils';

import { convertCurrencyToNumber } from '../../utilities/stringUtils';
import { findErrorMessage } from '../../utilities/objectUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

import { cacheExpenseList } from '../../../store/cache';

const ViewExpenses = ({
  daybookView,
  defaultExpenses,
  accounts,
  expenseAccounts,
  showErrorSnackbar,
  showSuccessSnackbar,
}) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const filters = useMemo(() => getFilters(essentials), [essentials]);
  const expenseListCache = useSelector(
    (state) => state.cache.expensesListCache
  );

  const [expensesData, setExpensesData] = useState(
    daybookView
      ? formatExpensesData(defaultExpenses, accounts, expenseAccounts)
      : expenseListCache.expensesData
      ? formatExpensesData(
          expenseListCache.expensesData,
          accounts,
          expenseAccounts
        )
      : []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingForm, setEditingForm] = useState({});
  const [oldExpenseState, setOldExpenseState] = useState({});
  const [dialogueState, setDialogueState] = useState({
    open: false,
    dialogueValue: null,
    deleteItem: false,
    idToDelete: null,
  });
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (dialogueState.dialogueValue && dialogueState.deleteItem) {
      let newExpensesData = expensesData.filter(
        (expense) => expense.id !== dialogueState.idToDelete
      );
      instance
        .delete(
          getURL(EXPENSE_URLS.DELETE_EXPENSE, 'uuid', dialogueState.idToDelete)
        )
        .then((res) => {
          setExpensesData(newExpensesData);
          showSuccessSnackbar(SUCCESS.DELETED);
          setDialogueState({
            ...dialogueState,
            open: false,
            dialogueValue: false,
            deleteItem: false,
            idToDelete: null,
          });
        })
        .catch((error) => {
          showErrorSnackbar(findErrorMessage(error.response.data));
        });
    }
  }, [dialogueState]);

  const handleSearch = (data) => {
    let formattedExpenses = formatExpensesData(data, accounts, expenseAccounts);
    dispatch(
      cacheExpenseList({
        expensesData: formattedExpenses,
      })
    );
    setExpensesData(formattedExpenses);
    setIsEmpty(formattedExpenses.length === 0);
  };

  const edit = (data) => {
    instance
      .put(getURL(EXPENSE_URLS.EDIT_EXPENSE, 'uuid', data.id), data)
      .then((res) => {
        let expenseIndexToEdit = expensesData.findIndex(
          (expense) => expense.id === res.data.id
        );
        let newExpenseData = [...expensesData];
        newExpenseData[expenseIndexToEdit] = {
          ...res.data,
          expense: expenseAccounts[res.data.expense].label,
          account_type: accounts[res.data.account_type].label,
          expense_obj: expenseAccounts[res.data.expense],
          account_type_obj: accounts[res.data.account_type],
        };
        setExpensesData(newExpenseData);
        dispatch(
          cacheExpenseList({
            expensesData: newExpenseData,
          })
        );
        showSuccessSnackbar(SUCCESS.EDITED);
        setIsEditing(false);
        setEditingForm({});
        setOldExpenseState({});
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  const handleEdit = (id) => {
    let expenseToEdit = expensesData.filter((expense) => expense.id === id)[0];
    setOldExpenseState({
      ...expenseToEdit,
      date: convertDate(
        'DD-MM-YYYY HH:mm:ss',
        'YYYY-MM-DD HH:mm:ss',
        expenseToEdit.date
      ),
      amount: convertCurrencyToNumber(expenseToEdit.amount),
      account_type: expenseToEdit.account_type_obj,
      expense: expenseToEdit.expense_obj,
    });
    let form = getExpenseForm(
      essentials.expenseAccounts,
      essentials.accountTypes
    );
    form.action = edit;
    setEditingForm(form);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setDialogueState({
      ...dialogueState,
      open: true,
      deleteItem: true,
      idToDelete: id,
    });
  };

  return (
    <>
      {!daybookView && <Heading heading={'View Expenses'} />}
      <ConfirmationModal
        open={dialogueState.open}
        setDialogueState={(value) =>
          setDialogueState({ ...dialogueState, ...value })
        }
        closeDialogue={() =>
          setDialogueState({ ...dialogueState, open: false })
        }
      />
      {isEditing && (
        <AddModal
          open={isEditing}
          handleClose={() => setIsEditing(false)}
          form={editingForm}
          defaultFormState={oldExpenseState}
          isEdit
        />
      )}
      {!daybookView && (
        <>
          <CustomFilters
            api={EXPENSE_URLS.LIST_EXPENSE_DETAILS}
            onSearch={handleSearch}
            filters={filters}
          />
        </>
      )}
      <>
        {expensesData.length > 0 && (
          <Printable
            documentTitle='Expenses Report'
            displayPrint={expensesData.length > 0 || daybookView}>
            <ExpenseDetail
              rows={expensesData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Printable>
        )}
        {isEmpty && <Empty />}
      </>
    </>
  );
};

export default withSnackbar(ViewExpenses);
