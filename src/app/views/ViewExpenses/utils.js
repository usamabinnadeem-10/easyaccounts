import {
  getReadableDate,
  formatCurrency,
  convertCurrencyToNumber,
} from "../../utilities/stringUtils";

export const formatExpensesData = (expenses) => {
  let totalExpenses = 0;
  let expensesData = expenses.map((expense) => {
    totalExpenses += expense.amount;
    return {
      ...expense,
      date: getReadableDate(expense.date),
      amount: formatCurrency(expense.amount),
    };
  });
  expensesData.length > 0 &&
    expensesData.push({
      date: "TOTAL",
      amount: formatCurrency(totalExpenses),
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
