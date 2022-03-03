import { FIELDS } from "../../containers/CustomFilters/constants";

export const getFilters = (accounts) => {
  return [
    {
      qp: "account",
      options: accounts,
      type: FIELDS.SELECT,
      placeholder: "Account",
    },
  ];
};

export const formatData = (data) => {
  let balance = 0;
  let formattedData = [];
  data.forEach((value) => {
    balance += value.nature === "C" ? value.amount : -value.amount;
    formattedData.push({
      ...value,
      balance,
      credit: value.nature === "C" ? value.amount : "",
      debit: value.nature === "D" ? value.amount : "",
    });
  });
  return formattedData;
};
