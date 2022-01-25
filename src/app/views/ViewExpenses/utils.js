import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

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
  return formatCurrency(expenses.reduce((prev, curr) => prev + curr.amount, 0));
};

export const convertCurrencyToNumber = (currency) => {
  if (typeof currency === "string" || currency instanceof String) {
    let amount = currency.replace(/[,]+/g, "");
    return parseFloat(amount);
  }
  return currency;
};
