import {
  getReadableDate,
  formatCurrency,
  convertCurrencyToNumber,
} from '../../utilities/stringUtils';

export const formatExpensesData = (expenses, accounts, expenseAccounts) => {
  let totalExpenses = 0;
  let expensesData = expenses.map((expense, index) => {
    totalExpenses += expense.amount;
    return {
      ...expense,
      expense: expenseAccounts?.[expense.expense]?.label,
      expense_obj: expenseAccounts?.[expense.expense],
      account_type: accounts?.[expense.account_type]?.label,
      account_type_obj: accounts?.[expense.account_type],
      date: getReadableDate(expense.date),
      amount: formatCurrency(expense.amount),
    };
  });
  expensesData.length > 0 &&
    expensesData.push({
      id: expensesData.length + 1,
      date: 'TOTAL',
      amount: formatCurrency(totalExpenses),
      disableEditing: true,
    });
  return expensesData;
};

export const getTotalExpenses = (expenses) => {
  return formatCurrency(
    expenses.reduce(
      (prev, curr) => prev + convertCurrencyToNumber(curr.amount),
      0
    )
  );
};
