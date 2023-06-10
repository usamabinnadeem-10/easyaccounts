export const formatTransactionData = (transactions, essentials) => {
  const { warehouses, rawProducts, customers, suppliers } = essentials;
  return transactions.map((data) => ({
    ...data,
    person: [...customers, ...suppliers].find((p) => p.value === data.person),
    numLots: data.lots.length,
    numThaans: data.lots.reduce(
      (prev, curr) =>
        prev +
        curr.lot_detail.reduce((prev2, curr2) => prev2 + curr2.quantity, 0),
      0,
    ),
    lotData: data.lots.map((lot) => ({
      ...lot,
      raw_product: rawProducts.find((p) => p.value === lot.raw_product),
      lotDetail: lot.lot_detail.map((detail) => ({
        ...detail,
        warehouse: warehouses.find((w) => w.value === detail.warehouse),
      })),
    })),
  }));
};
