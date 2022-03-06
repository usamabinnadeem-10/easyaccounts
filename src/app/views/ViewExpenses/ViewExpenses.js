import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { useSelector } from "react-redux";

import { useReactToPrint } from "react-to-print";

import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import StartEndDate from "../../components/StartEndDate/StartEndDate";
import ExpenseDetail from "../../components/ExpenseDetail/ExpenseDetail";
import AddModal from "../../containers/AddModal/AddModal";
import Empty from "../../components/Empty/Empty";
import Heading from "../../components/Heading";

import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import { useStyles } from "./styles";

import { getExpenseForm } from "../../containers/FAB/constants";

import instance from "../../../utils/axiosApi";
import {
  makeQueryParamURL,
  getURL,
  convertDate,
} from "../../utilities/stringUtils";
import { EXPENSE_URLS } from "../../../constants/restEndPoints";
import { ERRORS, SUCCESS } from "./constants";
import { formatExpensesData, getTotalExpenses } from "./utils";

import { convertCurrencyToNumber } from "../../utilities/stringUtils";

import { withSnackbar } from "../../hoc/withSnackbar";

const ViewExpenses = ({
  daybookView,
  defaultExpenses,
  accounts,
  expenseAccounts,
  showErrorSnackbar,
  showSuccessSnackbar,
}) => {
  const classes = useStyles();
  const componentRef = useRef();
  const essentials = useSelector((state) => state.essentials);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expensesData, setExpensesData] = useState(
    daybookView ? formatExpensesData(defaultExpenses) : []
  );
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingForm, setEditingForm] = useState({});
  const [oldExpenseState, setOldExpenseState] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);
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
          getURL(EXPENSE_URLS.DELETE_EXPENSE, "uuid", dialogueState.idToDelete)
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
          showErrorSnackbar(ERRORS.OOPS);
        });
    }
  }, [dialogueState]);

  useEffect(() => {
    setTotalExpenses(getTotalExpenses(expensesData));
  }, [expensesData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        let formattedExpenses = formatExpensesData(res.data);
        setExpensesData(formattedExpenses);
        setIsEmpty(formattedExpenses.length === 0);
        setTotalExpenses(getTotalExpenses(res.data));
        setLoading(false);
        setStartDate(null);
        setEndDate(null);
      })
      .catch((error) => {
        setLoading(false);
        showErrorSnackbar(ERRORS.OOPS);
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
        showSuccessSnackbar(SUCCESS.EDITED);
        setIsEditing(false);
        setEditingForm({});
        setOldExpenseState({});
      })
      .catch((error) => {
        showErrorSnackbar(ERRORS.OOPS);
      });
  };

  const handleEdit = (id) => {
    let expenseToEdit = expensesData.filter((expense) => expense.id === id)[0];
    setOldExpenseState({
      ...expenseToEdit,
      date: convertDate("DD-MM-YYYY", "YYYY-MM-DD", expenseToEdit.date),
      amount: convertCurrencyToNumber(expenseToEdit.amount),
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
    setDialogueState({
      ...dialogueState,
      open: true,
      deleteItem: true,
      idToDelete: id,
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
        <div className={classes.root}>
          <Heading heading={"View Expenses"} />

          <div className={classes.dateContainer}>
            <StartEndDate
              startDate={startDate}
              endDate={endDate}
              getStartDate={(date) => setStartDate(date)}
              getEndDate={(date) => setEndDate(date)}
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
      <div className={classes.expensesWrapper} ref={componentRef}>
        {!!totalExpenses && expensesData.length > 0 && (
          <Grid
            sx={{ mb: 2 }}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1" fontWeight={500}>
              {`Expenses (${expensesData[0].date}) - (${
                expensesData[expensesData.length - 2].date
              })`}
            </Typography>
            <Button
              sx={{ displayPrint: "none" }}
              onClick={handlePrint}
              variant="contained"
              color="secondary"
            >
              PRINT
            </Button>
          </Grid>
        )}
        {expensesData.length > 0 && (
          <ExpenseDetail
            rows={expensesData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        {isEmpty && <Empty />}
      </div>
    </>
  );
};

export default withSnackbar(ViewExpenses);
