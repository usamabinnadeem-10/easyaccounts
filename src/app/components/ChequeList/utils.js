import { getReadableDate } from '../../utilities/stringUtils';

export const getTableData = (data, persons) => {
  let cheques = data.map((cheque, idx) => ({
    ...cheque,
    index: idx + 1,
    person: persons?.[cheque.person]?.label,
    due_date: getReadableDate(cheque.due_date),
    date: getReadableDate(cheque.date),
  }));
  let total = data.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  cheques.push({
    id: 1,
    serial: 'Total',
    amount: total,
  });
  return cheques;
};
