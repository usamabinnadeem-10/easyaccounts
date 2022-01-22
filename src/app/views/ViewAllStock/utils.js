export const formatStockData = (data, props) => {
    let newStockData = data.map((stockData) => {
      return {
        ...stockData,
        product: props.products[stockData.product].label,
        warehouse: props.warehouses[stockData.warehouse].label
      }
    })
    return newStockData;
  };