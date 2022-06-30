import { convertDate } from '../../utilities/stringUtils';

export const formatBalanceSheet = (data) => {
  let heads = ['assets', 'liabilities', 'equity'];
  let sheet = {
    totals: {},
    date: convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', data.date),
  };
  for (let i = 0; i < heads.length; i++) {
    let total = 0;
    let head = heads[i];
    sheet[head] = [];
    for (const key in data[head]) {
      let name = key.replaceAll('_', ' ');
      name = name.charAt(0).toUpperCase() + name.slice(1);
      sheet[head].push({
        value: data[head][key],
        label: name,
      });
      total += data[head][key];
    }
    sheet.totals[head] = total;
  }
  return sheet;
};
