import { FIELDS } from './constants';

import {
  FormAutoCompleteField,
  FormDateField,
  FormTextField,
  FormSwitchField,
} from '../../../utilities/formUtils';

const calculateValues = (obj, isTransfer) => {
  let qty = obj[FIELDS.quantity] || 0;
  let formula = obj[FIELDS.formula];
  // let ratio = formula?.numerator / formula?.denominator;
  let expected = qty * obj[FIELDS.expected_gazaana] || 0;
  let actual = qty * obj[FIELDS.actual_gazaana] || 0;
  let rate_gazaana = obj[FIELDS.rate_gazaana] || 0;
  let total = !isTransfer ? obj[FIELDS.rate] * rate_gazaana : 0;
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
  isTransfer = false,
) => {
  let obj = values[key1][lotIndex][key2][lotDetailIndex];
  let calculated = calculateValues(obj, isTransfer);
  let totals = [
    {
      label: 'Stock Gaz',
      value: calculated.actual,
    },
    {
      label: 'Physical Gaz',
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
  isTransfer = false,
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
      label: 'Gazaana',
      value: actual.toFixed(2),
    },
    {
      label: 'Physical Gazaana',
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

export const FIELD_TYPES = {
  STRING: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  DATE: 'date',
  SWITCH: 'switch',
};

export const FIELD_MAP = {
  [FIELD_TYPES.NUMBER]: FormTextField,
  [FIELD_TYPES.STRING]: FormTextField,
  [FIELD_TYPES.SELECT]: FormAutoCompleteField,
  [FIELD_TYPES.DATE]: FormDateField,
  [FIELD_TYPES.SWITCH]: FormSwitchField,
};

export const getFieldProps = (field, errors, touched) => ({
  component: FIELD_MAP[field.type],
  options: field.options,
  name: field.field,
  type: field.type,
  size: 'small',
  label: field.label,
  fullWidth: true,
  isError: !!errors[field.field] && touched[field.field],
  errorText: errors[field.field],
  onCheckedLabel: field.onCheckedLabel ?? null,
});
