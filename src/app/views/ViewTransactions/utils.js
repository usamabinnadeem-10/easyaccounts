export const formatTransactionData = (data) => {
    let transactions = [];
    data.forEach((element) => {
      let total = 0.0;
      element.transaction_detail.forEach((detail) => {
        total += detail.amount;
      });
      transactions.push({
        ...element,
        total: total,
      });
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
        gazaana: {
          value: element.yards_per_piece,
          label: element.yards_per_piece
        },
        rate: element.rate,
        total: element.amount,
        id: element.id,
        });
    });
    return transactions;
};