import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

export const formatLedgerData = (data, opening, persons) => {
  let ledger = [];
  let balance = opening;
  data.forEach((element) => {
    let amount = element.amount;
    let nature = element.nature;
    if (nature === "D") {
      balance -= amount;
    } else {
      balance += amount;
    }
    ledger.push({
      ...element,
      date: getReadableDate(element.date),
      credit: nature === "C" ? formatCurrency(amount) : "",
      debit: nature === "D" ? formatCurrency(amount) : "",
      balance: formatCurrency(balance),
      person_name: persons?.[element.person]?.label,
      formattedBalance: `${formatCurrency(Math.abs(balance))} ${
        balance < 0 ? "DB" : "CR"
      }`,
    });
  });
  return ledger;
};
