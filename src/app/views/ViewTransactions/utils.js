import { getReadableDate } from '../../utilities/stringUtils';

import { FIELDS } from '../../containers/CustomFilters/constants';

import { ROLES } from '../../../constants/roles';

import { INVOICE_OPTIONS } from '../../../constants/choices';

export const formatTransactionData = (data) => {
  let transactions = [];
  let grandTotal = 0;
  let totalDiscount = 0;
  data.forEach((element) => {
    let total = 0.0;
    element.transaction_detail.forEach((detail) => {
      total += detail.rate * detail.quantity * detail.yards_per_piece;
    });
    totalDiscount += element.discount;
    grandTotal += total;
    transactions.push({
      ...element,
      serial: `${element.serial_type}-${element.serial}`,
      manual_serial: `${element.manual_serial || '---'}`,
      date: getReadableDate(element.date),
      total: total,
    });
  });
  transactions.length > 0 &&
    transactions.push({
      serial: 'TOTAL',
      manual_invoice_serial: `${transactions.length}`,
      total: grandTotal,
      discount: totalDiscount,
    });
  return transactions;
};

export const formatTransactionDetails = (details, products, warehouses) => {
  let transactions = [];
  details.forEach((element) => {
    let product = products[element.product];
    let warehouse = warehouses[element.warehouse];
    transactions.push({
      product: product,
      warehouse: warehouse,
      quantity: element.quantity,
      yards_per_piece: {
        value: element.yards_per_piece,
        label: element.yards_per_piece,
      },
      rate: element.rate,
      total: element.rate * element.quantity * element.yards_per_piece,
      id: element.id,
    });
  });
  return transactions;
};

const TRANSACTION_TYPES = [
  {
    label: 'Credit',
    value: 'credit',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Maal Wapsi',
    value: 'maal_wapsi',
  },
  {
    label: 'Purchase',
    value: 'purchase',
  },
];

const TRANSACTION_STATUS_OPTIONS = [
  {
    label: 'Complete',
    value: false,
  },
  {
    label: 'Incomplete',
    value: true,
  },
];

export const getFilters = (essentials, role) => {
  return [
    {
      qp: 'person',
      options: [ROLES.ADMIN, ROLES.ACCOUNTANT].includes(role)
        ? [...essentials.suppliers, ...essentials.customers]
        : essentials.customers,
      type: FIELDS.SELECT,
      placeholder: 'Person',
    },
    {
      qp: 'account_type',
      options: essentials.accountTypes,
      type: FIELDS.SELECT,
      placeholder: 'Account',
    },
    {
      qp: 'transaction_detail__product',
      type: FIELDS.SELECT,
      options: essentials.products,
      placeholder: 'Product',
    },
    {
      qp: 'serial_type',
      options: INVOICE_OPTIONS,
      type: FIELDS.SELECT,
      placeholder: 'Invoice Type',
    },
    {
      qp: 'type',
      options: TRANSACTION_TYPES,
      type: FIELDS.SELECT,
      placeholder: 'Transaction Type',
    },
    {
      qp: 'serial',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (equal to)',
    },
    {
      qp: 'serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (more than)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (less than)',
    },
    {
      qp: 'manual_serial',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (equal to)',
    },
    {
      qp: 'manual_serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (more than)',
    },
    {
      qp: 'manual_serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (less than)',
    },
    {
      qp: 'date__gte',
      type: FIELDS.DATE,
      placeholder: 'Start Date',
      variant: 'start',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'End Date',
      variant: 'end',
    },
    {
      qp: 'requires_action',
      options: TRANSACTION_STATUS_OPTIONS,
      type: FIELDS.SELECT,
      placeholder: 'Complete / Incomplete',
    },

    // {
    //   qp: 'discount__gte',
    //   type: FIELDS.NUMBER,
    //   placeholder: 'Discount (more than)',
    // },
    // {
    //   qp: 'discount__gte',
    //   type: FIELDS.NUMBER,
    //   placeholder: 'Discount (less than)',
    // },
    // {
    //   qp: 'detail',
    //   type: FIELDS.TEXT,
    //   placeholder: 'Detail',
    // },
  ];
};
