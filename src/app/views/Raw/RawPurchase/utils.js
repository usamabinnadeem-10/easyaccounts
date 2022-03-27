import { FIELDS, FIELD_TYPES } from "./constants";

export const getMetaFields = (essentials) => {
  return [
    {
      field: FIELDS.person,
      type: FIELD_TYPES.SELECT,
      options: essentials.suppliers,
      label: "Supplier",
    },
    {
      field: FIELDS.manual_book_number,
      type: FIELD_TYPES.NUMBER,
      label: "Manual book number",
    },
    {
      field: FIELDS.date,
      type: FIELD_TYPES.DATE,
      label: "Date",
    },
  ];
};

export const getLotDetailFields = (essentials, lotIndex, lotDetailIndex) => {
  return [
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.quantity}`,
      name: FIELDS.quantity,
      type: FIELD_TYPES.NUMBER,
      label: "Thaan",
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.yards_per_piece_actual}`,
      name: FIELDS.yards_per_piece_actual,
      type: FIELD_TYPES.NUMBER,
      label: "Actual",
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.yards_per_piece_expected}`,
      name: FIELDS.yards_per_piece_expected,
      type: FIELD_TYPES.NUMBER,
      label: "Expected",
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.formula}`,
      name: FIELDS.formula,
      type: FIELD_TYPES.SELECT,
      options: [
        {
          value: "12345",
          label: "20/21",
          numerator: 20,
          denominator: 21,
        },
        {
          value: "123456",
          label: "19/20",

          numerator: 19,
          denominator: 20,
        },
        {
          value: "123451",
          label: "19/21",

          numerator: 19,
          denominator: 21,
        },
      ],
      label: "Formula",
      xs: 1,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.rate}`,
      name: FIELDS.rate,
      type: FIELD_TYPES.NUMBER,
      label: "Rate",
      xs: 1,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.lot_detail}.${lotDetailIndex}.${FIELDS.warehouse}`,
      name: FIELDS.warehouse,
      options: essentials.warehouses,
      type: FIELD_TYPES.SELECT,
      label: "Warehouse",
      xs: 2,
    },
  ];
};

export const getLotHeadField = (essentials, lotIndex, issue) => {
  return [
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.raw_product}`,
      name: FIELDS.raw_product,
      type: FIELD_TYPES.SELECT,
      options: essentials.products,
      label: "Kora product",
      render: true,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.issue_dying}`,
      name: FIELDS.issue_dying,
      type: FIELD_TYPES.SWITCH,
      label: "Issue for dying",
      onCheckedLabel: "Issued",
      render: true,
    },
    {
      field: `${FIELDS.lots}.${lotIndex}.${FIELDS.dying_unit}`,
      name: FIELDS.dying_unit,
      type: FIELD_TYPES.SELECT,
      render: issue,
      label: "Dying Unit",
      options: [
        {
          label: "Manzoor Ayub",
          value: "321451",
        },
      ],
    },
  ];
};
