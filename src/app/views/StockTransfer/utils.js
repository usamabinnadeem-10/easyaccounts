export const formatStock = (stock, products, warehouses) => {
  return stock.map((data) => ({
    id: data.id,
    label: `${products[data.product].label} / ${data.yards_per_piece} / ${
      warehouses[data.warehouse].label
    }`,
  }));
};
