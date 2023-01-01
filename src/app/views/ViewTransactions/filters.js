import { FIELDS } from '../../containers/CustomFilters/constants';

import { ROLES } from '../../../constants/roles';
import { INVOICE_OPTIONS } from '../../../constants/choices';

import * as constants from './constants';

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
      qp: 'transaction_detail__product',
      type: FIELDS.SELECT,
      options: essentials.products,
      placeholder: 'Product',
    },
    {
      qp: 'transaction_detail__product__category',
      type: FIELDS.SELECT,
      options: essentials.productCategories,
      placeholder: 'Product category',
    },
    {
      qp: 'account_type',
      options: essentials.accountTypes,
      type: FIELDS.SELECT,
      placeholder: 'Account',
    },

    {
      qp: 'serial_type',
      options: INVOICE_OPTIONS,
      type: FIELDS.SELECT,
      placeholder: 'Invoice Type',
    },
    {
      qp: 'type',
      options: constants.TRANSACTION_TYPES,
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
      placeholder: 'Serial (from)',
    },
    {
      qp: 'serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Serial (to)',
    },
    {
      qp: 'manual_serial',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (equal to)',
    },
    {
      qp: 'manual_serial__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (from)',
    },
    {
      qp: 'manual_serial__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Book # (to)',
    },
    {
      qp: 'wasooli_number',
      type: FIELDS.NUMBER,
      placeholder: 'Wasooli # (equal to)',
    },
    {
      qp: 'wasooli_number__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Wasooli # (from)',
    },
    {
      qp: 'wasooli_number__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Wasooli # (to)',
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
      qp: 'is_cancelled',
      options: constants.CANCELLED,
      type: FIELDS.SELECT,
      placeholder: 'Cancelled?',
    },
    {
      qp: 'requires_action',
      options: constants.TRANSACTION_STATUS_OPTIONS,
      type: FIELDS.SELECT,
      placeholder: 'Complete / Incomplete',
    },

    // {
    //   qp: 'discount__gte',
    //   type: FIELDS.NUMBER,
    //   placeholder: 'Discount (from)',
    // },
    // {
    //   qp: 'discount__gte',
    //   type: FIELDS.NUMBER,
    //   placeholder: 'Discount (to)',
    // },
    {
      qp: 'detail__icontains',
      type: FIELDS.TEXT,
      placeholder: 'Detail',
    },
  ];
};
