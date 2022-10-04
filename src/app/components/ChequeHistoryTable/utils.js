import { getReadableDate, formatCurrency } from '../../utilities/stringUtils';

export const formatHistoryData = (history, accounts, persons) => {
  let total = history.reduce((prev, curr) => prev + curr.amount, 0);
  let data = history.map((value, index) => ({
    ...value,
    person: persons?.[value.person].label,
    account_type: accounts?.[value.account_type].label,
    date: getReadableDate(value.date),
    amount: formatCurrency(value.amount),
  }));
  data.push({
    id: 1,
    serial: 'Total',
    amount: formatCurrency(total),
  });
  return data;
};
