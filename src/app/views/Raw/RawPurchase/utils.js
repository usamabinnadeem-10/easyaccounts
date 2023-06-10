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
      field: FIELDS.manual_serial,
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

export const getLotDetailFields = (
  essentials,
  lotIndex,
  lotDetailIndex,
  formulas,
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
      label: 'Stock Gazaana',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.expected_gazaana}`,
      name: FIELDS.expected_gazaana,
      type: FIELD_TYPES.NUMBER,
      label: 'Physical Gazaana',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.rate_gazaana}`,
      name: FIELDS.rate_gazaana,
      type: FIELD_TYPES.NUMBER,
      label: 'Rate Gazaana',
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.formula}`,
      name: FIELDS.formula,
      type: FIELD_TYPES.SELECT,
      options: formulas,
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
  products,
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

export const getLotFooterFields = (lotIndex, issue) => {
  return [
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.detail}`,
      name: FIELDS.detail,
      type: FIELD_TYPES.STRING,
      label: 'Detail',
      render: true,
      isFast: true,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.warehouse_number}`,
      name: FIELDS.warehouse_number,
      type: FIELD_TYPES.NUMBER,
      label: 'Warehouse #',
      render: !issue,
      isFast: false,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.dying_number}`,
      name: FIELDS.dying_number,
      type: FIELD_TYPES.NUMBER,
      render: issue,
      label: 'Dying #',
      isFast: false,
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
    manual_serial: values.manual_serial,
    person: values.person.value,
    lots: values.lots.map((lot) => ({
      ...lot,
      raw_product: lot.raw_product.value,
      dying_unit: lot.dying_unit?.id || null,
      lot_detail: lot.lot_detail.map((detail) => ({
        ...detail,
        ...(detail.formula?.id && { formula: detail.formula.id }),
        warehouse: detail.warehouse?.value,
      })),
    })),
  };
};

export const formatTransactionForEditing = (transaction, hashes) => {
  const { persons, rawProducts, warehouses } = hashes;
  return {
    ...transaction,
    person: persons?.[transaction.person],
    lots: transaction.lots.map((lot) => {
      const rawProduct = rawProducts?.[lot.raw_product];
      return {
        ...lot,
        raw_product: {
          value: rawProduct.value,
          label: `${rawProduct.label} - ${rawProduct.type}`,
        },
        lot_detail: lot.lot_detail.map((detail) => {
          return {
            ...detail,
            warehouse: warehouses?.[detail.warehouse],
          };
        }),
      };
    }),
  };
};
