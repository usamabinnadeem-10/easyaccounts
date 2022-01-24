import { DB, DB_TRANSLATION } from "../../../constants/db";

import { getReadableDate } from "../../utilities/stringUtils";

export const getMeta = (transaction, essentials) => {
  let person = essentials.persons[transaction[DB.PERSON]];
  let data = [
    {
      value: transaction[DB.SERIAL],
      label: "Invoice #",
    },
    {
      value: person.label,
      label: `${DB_TRANSLATION[person.person_type]}:`,
    },
    {
      value: transaction[DB.DATE],
      label: "Date:",
    },
    {
      value: transaction[DB.TYPE]?.replace("_", " "),
      label: "Nature:",
    },
    {
      value: transaction[DB.DISCOUNT],
      label: "Discount:",
    },
    {
      value: transaction[DB.DETAIL] || "---",
      label: "Detail:",
    },
    {
      value: transaction.quantity,
      label: "Total Thaan:",
    },
    {
      value: transaction.gazaana,
      label: "Total Gazaana:",
    },
  ];

  let account =
    essentials.accounts[transaction[DB.ACCOUNT_TYPE]]?.label || "---";
  if (transaction[DB.PAID_AMOUNT]) {
    data = [
      ...data,
      {
        value: account,
        label: "Paid on:",
      },
      {
        value: transaction[DB.PAID_AMOUNT],
        label: "Amount Paid:",
      },
    ];
  }
  return data;
};

export const isTransactionAvailable = (transactions, transactionID) => {
  let found = transactions.filter((element) => element.id === transactionID);
  if (found.length) {
    return found[0];
  } else {
    return false;
  }
};

const formatTransactionDetails = (details, warehouses, products) => {
  let newDetails = [];
  details.forEach((detail) => {
    newDetails.push({
      ...detail,
      [DB.WAREHOUSE]: warehouses[detail[DB.WAREHOUSE]].label,
      [DB.PRODUCT]: products[detail[DB.PRODUCT]].label,
      total_gazaana: detail.yards_per_piece * detail.quantity,
    });
  });
  return newDetails;
};

export const formatTransaction = (transaction, warehouses, products) => {
  return {
    ...transaction,
    date: getReadableDate(transaction.date),
    quantity: transaction.transaction_detail.reduce(
      (prevValue, currentValue) => prevValue + currentValue.quantity,
      0
    ),
    gazaana: transaction.transaction_detail.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.quantity * currentValue.yards_per_piece,
      0
    ),
    [DB.TRANSACTION_DETAIL]: formatTransactionDetails(
      transaction.transaction_detail,
      warehouses,
      products
    ),
    [DB.ACCOUNT_TYPE]: transaction[DB.ACCOUNT_TYPE],
    [DB.PAID_AMOUNT]: transaction[DB.PAID_AMOUNT],
  };
};
