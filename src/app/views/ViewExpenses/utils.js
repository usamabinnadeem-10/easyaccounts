import {
  getReadableDate,
  formatCurrency,
  convertCurrencyToNumber,
} from "../../utilities/stringUtils";

export const formatExpensesData = (expenses) => {
  return expenses.map((expense) => {
    return {
      ...expense,
      date: getReadableDate(expense.date),
      amount: formatCurrency(expense.amount),
    };
  });
};

export const getTotalExpenses = (expenses) => {
  return formatCurrency(
    expenses.reduce(
      (prev, curr) => prev + convertCurrencyToNumber(curr.amount),
      0
    )
  );
};
