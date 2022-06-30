import { convertDate } from '../../utilities/stringUtils';

export const formatIncomeStatement = (data) => {
  return {
    ...data,
    period: `${
      data.date__gte
        ? convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', data.date__gte)
        : 'Opening'
    } to ${convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', data.date__lte)}`,
    totalExpenses: data.expenses.reduce((prev, curr) => prev + curr.total, 0),
  };
};
