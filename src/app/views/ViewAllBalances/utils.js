export const formatBalances = (data) => {
  let newBalancesData = [];
  for (let [key, value] of Object.entries(data)) {
    newBalancesData.push({
      person: key,
      balance: value,
    });
  }
  return newBalancesData;
};
