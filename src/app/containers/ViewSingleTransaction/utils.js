import { DB, DB_TRANSLATION } from "../../../constants/db";

import {findItemInArray} from "../../../utils/arrayUtils";

export const getMeta = (transaction, essentials) => {
  let person = findItemInArray(transaction[DB.PERSON], essentials.customers, 'value') ||
  findItemInArray(transaction[DB.PERSON], essentials.suppliers, 'value');
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
      value: transaction[DB.DETAIL],
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

  if (transaction[DB.PAID_AMOUNT]) {
    data = [
      ...data,
      {
        value: transaction[DB.ACCOUNT_TYPE],
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
