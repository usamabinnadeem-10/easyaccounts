import { v4 } from 'uuid';
import { getTimePeriod } from '../../utilities/stringUtils';

export const getTableData = (data) => {
  const { revenue, period } = data;
  return revenue.map((r) => ({
    ...r,
    id: v4(),
    period: getTimePeriod(r.period, period),
  }));
};
