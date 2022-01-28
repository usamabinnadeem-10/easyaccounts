export const getGazaanaOptions = (allStock, product, warehouse) => {
    return allStock.filter((stock) => stock.product === product && stock.warehouse === warehouse
    ).map((stock) => {
      return {
        value: stock.yards_per_piece,
        label: stock.yards_per_piece
      }
    })
}

export const getStockQuantity = (allStock, product, warehouse, gazaana) => {
  let stock = allStock.filter((stock) => stock.product === product && stock.warehouse === warehouse && stock.yards_per_piece === gazaana);
  if (stock.length) {
    return stock[0].stock_quantity;
  }
  return 0;
}

export const formatTransaction = (allStock, transactionDetails) => {
    return transactionDetails.map((value) => {
        return {
            ...value,
            total_gazaana: value.quantity * value.gazaana.value,
            gazaanaOptions: getGazaanaOptions(allStock, value.product.value, value.warehouse.value),
            stock_quantity: getStockQuantity(allStock, value.product.value, value.warehouse.value, value.gazaana.value)
        }
    })
}