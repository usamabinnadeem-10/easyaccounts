import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

export const formatLedgerData = (
  data,
  opening,
  persons
  // pending_cheques = 0,
  // transferred = 0,
  // transferred_to_this = 0
) => {
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
      id: 1,
      date: "TOTAL",
      credit: formatCurrency(totalCR),
      debit: formatCurrency(totalDB),
    });
  // ledger.length > 0 &&
  //   ledger.push({
  //     id: 1,
  //     date: "Pending Cheques",
  //     debit: Math.abs(pending_cheques),
  //   }) &&
  //   ledger.push({
  //     id: 2,
  //     date: "Pending Transferred Cheques",
  //     debit: Math.abs(transferred),
  //     credit: Math.abs(transferred_to_this),
  //   });
  return ledger;
};

export const getChequeTexts = (data) => [
  {
    text: "Pending cheques",
    value: data.pending_cheques,
  },
  {
    text: "Number of pending cheques",
    value: data.pending_cheques_count,
  },
  {
    text: "Transferred cheques",
    value: data.transferred_cheques,
  },
  {
    text: "Cheques transferred to this party",
    value: data.transferred_to_this_person,
  },
  {
    text: "Personal pending cheques",
    value: data.personal_pending,
  },
];
