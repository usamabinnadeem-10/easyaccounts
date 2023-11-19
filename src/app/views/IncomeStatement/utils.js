import { convertDate } from '../../utilities/stringUtils';

export const formatIncomeStatement = (data, expenseAccounts) => {
  const expenseAccountsHash = expenseAccounts?.reduce((prev, curr) => {
    prev[curr.value] = curr;
    return prev;
  }, {});
  console.log(expenseAccountsHash);
  return {
    ...data,
    expenses: data.expenses.map((expense) => ({
      ...expense,
      label: expenseAccountsHash?.[expense.expense]?.label,
      value: expense.total,
    })),
    period: `${
      data.date__gte
        ? convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', data.date__gte)
        : 'Opening'
    } to ${convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', data.date__lte)}`,
    totalExpenses: data.expenses.reduce((prev, curr) => prev + curr.total, 0),
  };
};
