import { DB, DB_TRANSLATION } from "../../../constants/db";

export const getMeta = (transaction, dontFetch) => {
  let data = [
    {
      value: transaction[DB.SERIAL],
      label: "Invoice #",
    },
    dontFetch
      ? {
          value: transaction[DB.PERSON_NAME],
          label: `${DB_TRANSLATION[transaction[DB.PERSON_TYPE]]}:`,
        }
      : {
          value: transaction[DB.PERSON],
          label: `${DB_TRANSLATION[transaction[DB.PERSON_TYPE]]}:`,
        },
    {
      value: transaction[DB.DATE],
      label: "Date:",
    },
    {
      value: transaction[DB.TYPE].replace("_", " "),
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
