import { FIELDS } from './constants';

const calculateValues = (obj, isTransfer) => {
  let qty = obj[FIELDS.quantity] || 0;
  let formula = obj[FIELDS.formula];
  let ratio = formula?.numerator / formula?.denominator;
  let expected = qty * obj[FIELDS.expected_gazaana] || 0;
  let actual = qty * ratio * obj[FIELDS.actual_gazaana] || 0;
  let total = !isTransfer ? obj[FIELDS.rate] * actual : 0;
  return {
    qty,
    expected,
    actual,
    total,
  };
};

export const getCalculatedValues = (
  values,
  lotIndex,
  lotDetailIndex,
  key1 = 'lots',
  key2 = 'lot_detail',
  isTransfer = false
) => {
  let obj = values[key1][lotIndex][key2][lotDetailIndex];
  let calculated = calculateValues(obj, isTransfer);
  let totals = [
    {
      label: 'Actual',
      value: calculated.actual,
    },
    {
      label: 'Expected',
      value: calculated.expected,
    },
  ];
  if (!isTransfer) {
    totals.push({
      label: 'Total',
      value: calculated.total,
    });
  }
  return totals;
};

export const getTotals = (
  values,
  global = false,
  key1 = 'lots',
  key2 = 'lot_detail',
  isTransfer = false
) => {
  let thaan = 0;
  let expected = 0;
  let actual = 0;
  let total = 0;
  if (global) {
    values[key1].forEach((lot) => {
      lot[key2].forEach((lotDetail) => {
        let calculated = calculateValues(lotDetail, isTransfer);
        expected += calculated.expected;
        actual += calculated.actual;
        thaan += calculated.qty;
        total += calculated.total;
      });
    });
  } else {
    values.forEach((lotDetail) => {
      let calculated = calculateValues(lotDetail, isTransfer);
      expected += calculated.expected;
      actual += calculated.actual;
      thaan += calculated.qty;
      total += calculated.total;
    });
  }

  let totals = [
    {
      label: 'Thaan',
      value: thaan,
    },
    {
      label: 'Actual',
      value: actual.toFixed(2),
    },
    {
      label: 'Expected',
      value: expected.toFixed(2),
    },
  ];
  if (!isTransfer) {
    totals.push({
      label: 'Total',
      value: total.toFixed(2),
    });
  }
  return totals;
};
