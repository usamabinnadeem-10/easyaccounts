import { formatCurrency } from "../../utilities/stringUtils";

export const formatBalances = (data) => {
  let newBalancesData = [];
  for (let [key, value] of Object.entries(data)) {
    newBalancesData.push({
      person: key,
      balance: formatCurrency(value),
      status: value > 0 ? "CR" : "DB",
    });
  }
  return newBalancesData;
};
