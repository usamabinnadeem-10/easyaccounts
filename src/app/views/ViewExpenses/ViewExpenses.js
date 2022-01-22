import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import StartEndDate from "../../components/StartEndDate/StartEndDate";
import CustomSnackbar from "../../containers/CustomSnackbar/CustomSnackbar";
import ExpenseDetail from "../../components/ExpenseDetail/ExpenseDetail";
import AddModal from "../../containers/AddModal/AddModal";

import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";

import { useStyles } from "./styles";

import { getExpenseForm } from "../../containers/FAB/constants";

import instance from "../../../utils/axiosApi";
import { makeQueryParamURL, getURL } from "../../utilities/stringUtils";
import { EXPENSE_URLS } from "../../../constants/restEndPoints";
import { ERRORS, SUCCESS } from "./constants";
import { makeDate, getDateFromString } from "../../utilities/stringUtils";


const ViewExpenses = ({ daybookView, defaultExpenses, accounts, expenseAccounts }) => {
  const classes = useStyles();

  const essentials = useSelector((state) => state.essentials);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expensesData, setExpensesData] = useState(
    daybookView ? defaultExpenses : []
  );
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [editingForm, setEditingForm] = useState({});
  const [oldExpenseState, setOldExpenseState] = useState({});

  // open snackbar
  const openSnackbar = (open, severity, message) => {
    setSnackbarState({
      open,
      severity,
      message,
    });
  };

  // close snackbar
  const closeSnackbar = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const search = () => {
    setLoading(true);
    const params = [
      startDate && {
        key: "date__gte",
        value: startDate,
      },
      endDate && {
        key: "date__lte",
        value: endDate,
      },
    ];
    const URL = makeQueryParamURL(EXPENSE_URLS.LIST_EXPENSE_DETAILS, params);

    instance
      .get(URL)
      .then((res) => {
        setExpensesData(res.data);
        setLoading(false);
        setStartDate(null);
        setEndDate(null);
      })
      .catch((error) => {
        setLoading(false);
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  const edit = (data) => {
    instance
      .put(getURL(EXPENSE_URLS.EDIT_EXPENSE, "uuid", data.id), data)
      .then((res) => {
        let expenseIndexToEdit = expensesData.findIndex(
          (expense) => expense.id === res.data.id
        );
        let newExpenseData = [...expensesData];
        newExpenseData[expenseIndexToEdit] = res.data;
        setExpensesData(newExpenseData);
        openSnackbar(true, "success", SUCCESS.EDITED);
        setIsEditing(false);
        setEditingForm({});
        setOldExpenseState({});
      })
      .catch((error) => {
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  const handleEdit = (id) => {
    let expenseToEdit = expensesData.filter((expense) => expense.id === id)[0];
    setOldExpenseState({
      ...expenseToEdit,
      account_type: expenseToEdit.account_type
        ? accounts[expenseToEdit.account_type]
        : null,
      expense: expenseAccounts[expenseToEdit.expense],
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
    let newExpensesData = expensesData.filter((expense) => expense.id !== id);
    instance
      .delete(getURL(EXPENSE_URLS.DELETE_EXPENSE, "uuid", id))
      .then((res) => {
        setExpensesData(newExpensesData);
        openSnackbar(true, "success", SUCCESS.DELETED);
      })
      .catch((error) => {
        openSnackbar(true, "error", ERRORS.OOPS);
      });
  };

  return (
    <>
      {isEditing && (
        <AddModal
          open={isEditing}
          handleClose={() => setIsEditing(false)}
          form={editingForm}
          openSnackbar={openSnackbar}
          closeSnackbar={closeSnackbar}
          defaultFormState={oldExpenseState}
          isEdit
        />
      )}
      <CustomSnackbar {...snackbarState} handleClose={closeSnackbar} />
      {!daybookView && (
        <div className={classes.root}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            View Expenses
          </Typography>

          <div className={classes.dateContainer}>
            <StartEndDate
              startDate={getDateFromString(startDate)}
              endDate={getDateFromString(endDate)}
              getStartDate={(date) => setStartDate(makeDate(date))}
              getEndDate={(date) => setEndDate(makeDate(date))}
            />
            <LoadingButton
              onClick={() => search()}
              variant="contained"
              sx={{ fontWeight: 700 }}
              loading={loading}
            >
              Search
            </LoadingButton>
          </div>
        </div>
      )}

      {expensesData.length > 0 && (
        <ExpenseDetail
          rows={expensesData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default ViewExpenses;
