export const getGazaanaOptions = (allStock, product) => {
  let filtered = allStock.filter(
    (stock) => stock.product === product && stock.stock_quantity > 0
  );
  let unique = {};
  let filteredUnique = [];
  filtered.forEach((stock) => {
    if (!unique[stock.yards_per_piece]) {
      unique[stock.yards_per_piece] = true;
      filteredUnique.push(stock);
    }
  });
  return filteredUnique.length > 0
    ? filteredUnique.map((stock) => {
        return {
          value: stock.yards_per_piece,
          label: stock.yards_per_piece,
        };
      })
    : [];
};

export const getWarehouseOptions = (allStock, product, gazaana, warehouses) => {
  let filtered = allStock.filter(
    (stock) =>
      stock.product === product &&
      stock.stock_quantity > 0 &&
      stock.yards_per_piece === gazaana
  );
  return filtered.length > 0
    ? filtered.map((stock) => {
        return {
          value: stock.warehouse,
          label: warehouses[stock.warehouse].label,
        };
      })
    : [];
};

export const getStockQuantity = (allStock, product, warehouse, gazaana) => {
  let stock = allStock.filter(
    (stock) =>
      stock.product === product &&
      stock.warehouse === warehouse &&
      stock.yards_per_piece === gazaana
  );
  if (stock.length) {
    return stock[0].stock_quantity;
  }
  return 0;
};

export const formatTransaction = (allStock, transactionDetails) => {
  return transactionDetails.map((value) => {
    return {
      ...value,
      total_gazaana: value.quantity * value.gazaana.value,
      gazaanaOptions: getGazaanaOptions(
        allStock,
        value.product.value,
        value.warehouse.value
      ),
      stock_quantity: getStockQuantity(
        allStock,
        value.product.value,
        value.warehouse.value,
        value.gazaana.value
      ),
    };
  });
};
