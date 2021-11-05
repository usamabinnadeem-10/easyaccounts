const findIndexAndAppendData = (array, data) => {
  let newAccountsData = [...array];
  data.forEach((element) => {
    let idx = newAccountsData.findIndex(
      (account) => account.account_type === element.account_type__name
    );
    if (idx >= 0) {
      let prevBalance = newAccountsData[idx].balance;
      newAccountsData[idx] = {
        ...newAccountsData[idx],
        balance:
          element.nature === "C"
            ? prevBalance + element.amount
            : prevBalance - element.amount,
      };
    } else {
      newAccountsData.push({
        account_type: element.account_type__name,
        balance: element.amount,
      });
    }
  });
  return newAccountsData;
};

export const formatAccountsData = (ledgersData, expensesData) => {
  let newAccountsData = [];
  newAccountsData = findIndexAndAppendData(newAccountsData, ledgersData);
  newAccountsData = findIndexAndAppendData(newAccountsData, expensesData);
  return newAccountsData;
};
