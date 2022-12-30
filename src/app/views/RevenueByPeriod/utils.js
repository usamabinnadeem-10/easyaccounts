import { v4 } from 'uuid';
import moment from 'moment';

const mergeArrays = (arr1, arr2) => {
  let merged = [];

  for (let i = 0; i < arr1.length; i++) {
    merged.push({
      ...arr1[i],
      ...arr2[i],
    });
  }
  return merged;
};

export const getTableData = (data) => {
  const { revenue, period, discounts } = data;
  const merged = mergeArrays(revenue, discounts);
  const sorted = merged.sort(function (left, right) {
    return moment.utc(left.period).diff(moment.utc(right.period));
  });
  return sorted.map((r) => ({
    ...r,
    id: v4(),
    period: moment(r.period),
    periodKey: period,
    sale: r.sale - r.discount,
  }));
};
