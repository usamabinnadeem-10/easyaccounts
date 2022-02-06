const findIndexAndAppendData = (array, data) => {
  let newAccountsData = [...array];
  data.forEach((element) => {
    let idx = newAccountsData.findIndex(
      (account) => account.account_type__name === element.account_type__name
    );
    if (idx >= 0) {
      let prevBalance = newAccountsData[idx].amount;
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

const sumAccounts = (accountsData, object) => {
  let newAccountsData = object;
  accountsData.forEach((element) => {
    if (!newAccountsData[element.account_type__name]) {
      newAccountsData[element.account_type__name] =
        element.nature === "C" ? +element.amount : -element.amount;
    } else {
      newAccountsData[element.account_type__name] +=
        element.nature === "C" ? +element.amount : -element.amount;
    }
  });
  return newAccountsData;
};

export const formatAccountsData = (ledgersData, expensesData) => {
  let newAccountsData = {};
  newAccountsData = sumAccounts(ledgersData, newAccountsData);
  newAccountsData = sumAccounts(expensesData, newAccountsData);
  return newAccountsData;
};
