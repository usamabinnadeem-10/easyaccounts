import { v4 } from 'uuid';

export const formatTransactionData = (data, persons) => {
  let transactions = [];
  let grandTotal = 0;
  let totalDiscount = 0;
  let grandTotalQuantity = 0;
  let grandTotalGazaana = 0;
  data.forEach((element, idx) => {
    let total = 0.0;
    let totalQuantity = 0.0;
    let totalGazaana = 0.0;
    element.transaction_detail.forEach((detail) => {
      total += detail.rate * detail.quantity * detail.yards_per_piece;
      totalQuantity += detail.quantity;
      totalGazaana += detail.quantity * detail.yards_per_piece;
    });
    totalDiscount += element.discount;
    grandTotal += total;
    grandTotalQuantity += totalQuantity;
    grandTotalGazaana += totalGazaana;
    transactions.push({
      ...element,
      index: idx + 1,
      person: persons?.[element.person]?.label,
      serial: `${element.serial_type}-${element.serial}`,
      manual_serial: `${element.manual_serial || ''}`,
      total: total - element.discount,
      totalQuantity,
      totalGazaana,
      hasClick: true,
    });
  });
  transactions.length > 0 &&
    transactions.push({
      id: v4(),
      serial: 'TOTAL',
      manual_invoice_serial: `${transactions.length}`,
      total: grandTotal - totalDiscount,
      hasClick: false,
      totalQuantity: grandTotalQuantity,
      totalGazaana: grandTotalGazaana,
      // discount: totalDiscount,
    });
  return transactions;
};

export const formatTransactionDetails = (details, products, warehouses) => {
  let transactions = [];
  details.forEach((element) => {
    let product = products[element.product];
    let warehouse = warehouses[element.warehouse];
    transactions.push({
      product: product,
      warehouse: warehouse,
      quantity: element.quantity,
      yards_per_piece: {
        value: element.yards_per_piece,
        label: element.yards_per_piece,
      },
      rate: element.rate,
      total: element.rate * element.quantity * element.yards_per_piece,
      id: element.id,
    });
  });
  return transactions;
};

const formatTransactionDetailForDetailedView = (
  tDetail,
  products,
  warehouses,
  transactionData,
) => {
  let data = [];
  let totalAmount = 0;
  let totalGazaana = 0;
  let totalQuantity = 0;
  const { manual_serial, date } = transactionData;
  tDetail.forEach((detail) => {
    let gazaana = detail.yards_per_piece * detail.quantity;
    let amount = detail.rate * gazaana;
    data.push({
      ...detail,
      product: products[detail.product].label,
      warehouse: warehouses[detail.warehouse].label,
      gazaana,
      amount,
      manual_serial,
      date,
      hideTransactionData: true,
    });
    totalQuantity += detail.quantity;
    totalAmount += amount;
    totalGazaana += gazaana;
  });
  data.push({
    id: v4(),
    quantity: totalQuantity,
    gazaana: totalGazaana,
    amount: totalAmount,
    product: 'Total',
    manual_serial,
    date,
    isTotal: true,
    hideTransactionData: true,
  });
  return data;
};

export const formatTransactionWithTransactionDetails = (data, essentials) => {
  let transactions = [];
  const { persons, products, warehouses } = essentials;
  data.forEach((transaction, idx) => {
    transactions.push({
      ...transaction,
      person: persons?.[transaction.person]?.label,
      serial: `${transaction.serial_type}-${transaction.serial}`,
      hasClick: true,
    });
    transactions.push(
      ...formatTransactionDetailForDetailedView(
        transaction.transaction_detail,
        products,
        warehouses,
        transaction,
      ),
    );
  });
  return transactions;
};
