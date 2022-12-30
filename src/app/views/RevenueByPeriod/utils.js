import { v4 } from 'uuid';
import moment from 'moment';
export const getTableData = (data) => {
  const { revenue, period } = data;
  const sorted = revenue.sort(function (left, right) {
    return moment.utc(left.period).diff(moment.utc(right.period));
  });
  return sorted.map((r) => ({
    ...r,
    id: v4(),
    period: moment(r.period),
    periodKey: period,
  }));
};
