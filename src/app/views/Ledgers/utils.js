import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

export const formatLedgerData = (data, opening, persons) => {
  let ledger = [];
  let balance = opening;
  let totalCR = 0;
  let totalDB = 0;
  data.forEach((element) => {
    let amount = element.amount;
    let nature = element.nature;
    if (nature === "D") {
      balance -= amount;
      totalDB += amount;
    } else {
      balance += amount;
      totalCR += amount;
    }
    ledger.push({
      ...element,
      manual_invoice_serial: `${element.manual_serial_type || "-"}-${
        element.manual_invoice_serial || "-"
      }`,
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
  ledger.length > 0 &&
    ledger.push({
      date: "TOTAL",
      credit: formatCurrency(totalCR),
      debit: formatCurrency(totalDB),
    });
  return ledger;
};
