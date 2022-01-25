import {
  formatCurrency,
  convertCurrencyToNumber,
} from "../../utilities/stringUtils";

export const formatStockData = (data, props) => {
  let newStockData = data.map((stockData) => {
    return {
      ...stockData,
      product: props.products[stockData.product].label,
      warehouse: props.warehouses[stockData.warehouse].label,
      stock_quantity: formatCurrency(stockData.stock_quantity),
      total_gazaana: formatCurrency(
        stockData.stock_quantity * stockData.yards_per_piece
      ),
    };
  });
  newStockData.push({
    product: "TOTAL",
    stock_quantity: formatCurrency(
      convertCurrencyToNumber(
        newStockData.reduce(
          (acc, stockData) => acc + stockData.stock_quantity,
          0
        )
      )
    ),
    total_gazaana: formatCurrency(
      convertCurrencyToNumber(
        newStockData.reduce(
          (acc, stockData) => acc + stockData.total_gazaana,
          0
        )
      )
    ),
  });
  return newStockData;
};
