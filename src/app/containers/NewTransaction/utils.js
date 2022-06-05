import { INITIAL } from './constants';

import { getToday } from '../../utilities/stringUtils';

export const getInitialValues = (toggleButtons, prefilledData) => {
  if (prefilledData) {
    return prefilledData;
  }
  return {
    ...INITIAL,
    date: getToday(),
    type: toggleButtons[0].value,
  };
};

export const getTransactionFooter = (showAccountTypes) => {
  return [
    {
      placeholder: 'Discount',
      visible: true,
      type: 'number',
      name: 'discount',
    },
    {
      placeholder: 'Paid Amount',
      visible: showAccountTypes,
      type: 'number',
      name: 'paid_amount',
    },
    {
      placeholder: 'Detail',
      visible: true,
      type: 'text',
      name: 'detail',
    },
  ];
};

export const formatDataForPosting = (values, natures, prefixes) => {
  return {
    nature: natures[values.type],
    person: values.person.value,
    discount: values.discount || 0,
    type: values.type,
    detail: values.detail || null,
    manual_invoice_serial: values.manual_invoice_serial,
    manual_serial_type: prefixes[values.type],
    requires_action: values.requires_action,
    date: values.date || null,
    paid: values.type === 'paid',
    paid_amount: values.paid_amount || 0,
    builty: values.builty || null,
    account_type: values.account_type?.value,
    transaction_detail: values.transaction_detail.map((data) => {
      return {
        // id: data.id,
        // new: data.new,
        product: data.product.value,
        yards_per_piece: data.yards_per_piece.value,
        quantity: data.quantity,
        rate: data.rate,
        warehouse: data.warehouse.value,
      };
    }),
  };
};
