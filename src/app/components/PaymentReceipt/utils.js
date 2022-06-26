import { convertDate } from '../../utilities/stringUtils';

const getTableRowObject = (heading, value) => {
  return {
    0: heading,
    1: value,
  };
};

const NATURES = {
  C: 'Credit',
  D: 'Debit',
};

export const formatPaymentAsTable = (paymentData, persons, accounts) => {
  return [
    getTableRowObject('Serial #', `P-${paymentData.serial}`),
    getTableRowObject('Person', persons?.[paymentData.person]?.label),
    getTableRowObject(
      'Date',
      convertDate('YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', paymentData.date)
    ),
    getTableRowObject('Amount', paymentData.amount),
    getTableRowObject('Nature', NATURES[paymentData.nature]),
    getTableRowObject(
      'Account',
      accounts?.[paymentData.account_type]?.label || '---'
    ),
    getTableRowObject('Detail', NATURES[paymentData.detail] || '---'),
  ];
};
