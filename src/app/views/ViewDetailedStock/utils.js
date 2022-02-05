import { getReadableDate, formatCurrency } from "../../utilities/stringUtils";

export const formatDetailedStock = (data, persons, warehouses) => {
  let stock = [];
  let balance = data.opening_stock;
  let totalCR = 0.0;
  let totalDB = 0.0;
  data.data.forEach((value) => {
    let currentNature = value.transaction__nature;
    if (currentNature === "C") {
      balance += value.quantity;
      totalCR += value.quantity;
    } else {
      balance -= value.quantity;
      totalDB += value.quantity;
    }
    stock.push({
      id: value.transaction_id,
      stock: balance,
      serial: value.transaction__serial,
      bookSerial: `${value.transaction__manual_serial_type}-${value.transaction__manual_invoice_serial}`,
      date: getReadableDate(value.transaction__date),
      credit: currentNature === "C" ? value.quantity : null,
      debit: currentNature === "D" ? value.quantity : null,
      person: persons?.[value.transaction__person].label,
      warehouse: warehouses?.[value.warehouse].label,
      gazaana: value.yards_per_piece,
      gazaanaBalance: formatCurrency(balance * value.yards_per_piece),
      transactionType: value.transaction__type,
    });
  });
  data.transfers.forEach((transfer) => {
    stock.push({
      id: transfer.id,
    });
  });
  stock.push({
    date: "TOTAL",
    credit: totalCR,
    debit: totalDB,
    stock: "---",
    gazaanaBalance: "---",
  });
  return stock;
};
