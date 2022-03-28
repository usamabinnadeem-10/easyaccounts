import { FIELDS, FIELD_TYPES } from './constants';

export const getMetaFields = (essentials) => {
  return [
    {
      field: FIELDS.person,
      type: FIELD_TYPES.SELECT,
      options: essentials.suppliers,
      label: 'Supplier',
    },
    {
      field: FIELDS.manual_invoice_serial,
      type: FIELD_TYPES.NUMBER,
      label: 'Manual book number',
    },
    {
      field: FIELDS.date,
      type: FIELD_TYPES.DATE,
      label: 'Date',
    },
  ];
};

export const formatFormulas = (formulas) => {
  return formulas.map((formula) => ({
    ...formula,
    label: `${formula.numerator}/${formula.denominator}`,
  }));
};

export const getLotDetailFields = (
  essentials,
  lotIndex,
  lotDetailIndex,
  formulas
) => {
  return [
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.quantity}`,
      name: FIELDS.quantity,
      type: FIELD_TYPES.NUMBER,
      label: 'Thaan',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.actual_gazaana}`,
      name: FIELDS.actual_gazaana,
      type: FIELD_TYPES.NUMBER,
      label: 'Actual',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.expected_gazaana}`,
      name: FIELDS.expected_gazaana,
      type: FIELD_TYPES.NUMBER,
      label: 'Expected',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.formula}`,
      name: FIELDS.formula,
      type: FIELD_TYPES.SELECT,
      options: formatFormulas(formulas),
      label: 'Formula',
      xs: 2,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.rate}`,
      name: FIELDS.rate,
      type: FIELD_TYPES.NUMBER,
      label: 'Rate',
      xs: 1,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.warehouse}`,
      name: FIELDS.warehouse,
      options: essentials.warehouses,
      type: FIELD_TYPES.SELECT,
      label: 'Warehouse',
      xs: 2,
    },
  ];
};

export const formatDyingOptions = (dyingOptions) => {
  return dyingOptions.map((dying) => ({
    id: dying.id,
    label: dying.name,
  }));
};

const filterProductsOfSupplier = (supplier, products) => {
  return products.filter((product) => product.person === supplier.value);
};

export const getLotHeadField = (
  supplier,
  lotIndex,
  issue,
  dyingOptions,
  products
) => {
  return [
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.raw_product}`,
      name: FIELDS.raw_product,
      type: FIELD_TYPES.SELECT,
      options: supplier?.value
        ? filterProductsOfSupplier(supplier, products)
        : [],
      label: 'Kora product',
      render: true,
      isFast: false,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.issued}`,
      name: FIELDS.issued,
      type: FIELD_TYPES.SWITCH,
      label: 'Issue for dying',
      onCheckedLabel: 'Issued',
      render: true,
      isFast: true,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.dying_unit}`,
      name: FIELDS.dying_unit,
      type: FIELD_TYPES.SELECT,
      render: issue,
      label: 'Dying Unit',
      options: formatDyingOptions(dyingOptions),
      isFast: true,
    },
  ];
};

const calculateValues = (obj) => {
  let qty = obj[FIELDS.quantity] || 0;
  let formula = obj[FIELDS.formula];
  let ratio = formula?.numerator / formula?.denominator;
  let expected = qty * obj[FIELDS.expected_gazaana] || 0;
  let actual = qty * ratio * obj[FIELDS.actual_gazaana] || 0;
  let total = obj[FIELDS.rate] * actual;
  return {
    qty,
    expected,
    actual,
    total,
  };
};

export const getCalculatedValues = (values, lotIndex, lotDetailIndex) => {
  let obj = values.lots[lotIndex].lot_detail[lotDetailIndex];
  let calculated = calculateValues(obj);
  return [
    {
      label: 'Actual',
      value: calculated.actual,
    },
    {
      label: 'Expected',
      value: calculated.expected,
    },
    {
      label: 'Total',
      value: calculated.total,
    },
  ];
};

export const getTotals = (values, global = false) => {
  let thaan = 0;
  let expected = 0;
  let actual = 0;
  if (global) {
    values.lots.forEach((lot) => {
      lot.lot_detail.forEach((lotDetail) => {
        let calculated = calculateValues(lotDetail);
        expected += calculated.expected;
        actual += calculated.actual;
        thaan += calculated.qty;
      });
    });
  } else {
    values.forEach((lotDetail) => {
      let calculated = calculateValues(lotDetail);
      expected += calculated.expected;
      actual += calculated.actual;
      thaan += calculated.qty;
    });
  }

  return [
    {
      label: 'Thaan',
      value: thaan,
    },
    {
      label: 'Actual',
      value: actual,
    },
    {
      label: 'Expected',
      value: expected,
    },
  ];
};

export const isFormValid = (values) => {
  let valid = {
    isValid: true,
    error: '',
  };
  values.lots.forEach((lot) => {
    if (lot.issued && !lot.dying_unit?.id) {
      valid.isValid = false;
      valid.error = 'Please choose a dying for issued lot';
    }
    lot.lot_detail.forEach((detail) => {
      if (!lot.issued && !detail.warehouse?.value) {
        valid.isValid = false;
        valid.error = 'Please choose a warehouse for non-issed lot';
      }
    });
  });
  return valid;
};

export const formatBeforeSubmit = (values) => {
  return {
    ...values,
    person: values.person.value,
    lots: values.lots.map((lot) => ({
      ...lot,
      raw_product: lot.raw_product.id,
      dying_unit: lot.dying_unit?.id || null,
      lot_detail: lot.lot_detail.map((detail) => ({
        ...detail,
        formula: detail.formula.id,
        warehouse: detail.warehouse?.value,
      })),
    })),
  };
};
