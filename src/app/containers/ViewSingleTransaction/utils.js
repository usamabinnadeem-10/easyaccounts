import { DB, DB_TRANSLATION } from "../../../constants/db";

export const getMeta = (transaction) => {
  let data = [
    {
      value: transaction[DB.SERIAL],
      label: "Invoice #",
    },
    {
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
