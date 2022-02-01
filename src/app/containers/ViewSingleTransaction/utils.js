import { DB, DB_TRANSLATION } from "../../../constants/db";

import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

export const getMeta = (transaction, essentials, gatePassView = false) => {
  let person = essentials.persons[transaction[DB.PERSON]];
  let data = [
    {
      value: transaction[DB.SERIAL],
      label: "Invoice #",
    },
    {
      value: transaction[DB.BOOK_SERIAL],
      label: "Book #",
    },
    {
      value: person.label,
      label: `${DB_TRANSLATION[person.person_type]}:`,
    },
    {
      value: transaction[DB.DATE],
      label: "Date:",
    },
  ];

  if (!gatePassView) {
    data = [
      ...data,
      {
        value: transaction[DB.TYPE]?.replace("_", " "),
        label: "Nature:",
      },
      {
        value: transaction[DB.DETAIL] || "---",
        label: "Detail:",
      },
    ];
  }

  let account =
    essentials?.accounts?.[transaction[DB.ACCOUNT_TYPE]]?.label || "---";
  if (transaction[DB.PAID_AMOUNT] && !gatePassView) {
    data = [
      ...data,
      {
        value: account,
        label: "Paid on:",
      },
      {
        value: formatCurrency(transaction[DB.PAID_AMOUNT]),
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

const formatTransactionDetails = (
  details,
  warehouses,
  products,
  grandTotalQuantity,
  grandTotalGazaana
) => {
  let newDetails = [];
  details.forEach((detail) => {
    newDetails.push({
      ...detail,
      amount: formatCurrency(detail.amount),
      [DB.WAREHOUSE]: warehouses?.[detail[DB.WAREHOUSE]].label,
      [DB.PRODUCT]: products?.[detail[DB.PRODUCT]].label,
      total_gazaana: formatCurrency(detail.yards_per_piece * detail.quantity),
    });
  });
  newDetails.push({
    product: "TOTAL",
    quantity: grandTotalQuantity,
    total_gazaana: grandTotalGazaana,
  });
  return newDetails;
};

export const formatTransaction = (transaction, warehouses, products) => {
  let totalAmount = transaction.transaction_detail.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  let grandTotalGazaana = transaction.transaction_detail.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.quantity * currentValue.yards_per_piece,
    0
  );
  let grandTotalQuantity = transaction.transaction_detail.reduce(
    (prevValue, currentValue) => prevValue + currentValue.quantity,
    0
  );
  return {
    ...transaction,
    total: formatCurrency(totalAmount, "currency"),
    date: getReadableDate(transaction.date),
    quantity: grandTotalQuantity,
    gazaana: formatCurrency(grandTotalGazaana),
    [DB.TRANSACTION_DETAIL]: formatTransactionDetails(
      transaction.transaction_detail,
      warehouses,
      products,
      grandTotalQuantity,
      grandTotalGazaana
    ),
    [DB.ACCOUNT_TYPE]: transaction[DB.ACCOUNT_TYPE],
    [DB.PAID_AMOUNT]: transaction[DB.PAID_AMOUNT],
    [DB.DISCOUNT]: formatCurrency(transaction[DB.DISCOUNT], "currency"),
    totalAfterDiscount: formatCurrency(
      totalAmount - transaction.discount,
      "currency"
    ),
  };
};
