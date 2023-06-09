export const formatTransactionData = (transactions, essentials) => {
  const { warehouses, rawProducts, customers, suppliers } = essentials;
  return transactions.map((data) => ({
    ...data,
    person: [...customers, ...suppliers].find((p) => p.value === data.person),
    numLots: data.rawtransactionlot_set.length,
    numThaans: data.rawtransactionlot_set.reduce(
      (prev, curr) =>
        prev +
        curr.raw_lot_detail.reduce((prev2, curr2) => prev2 + curr2.quantity, 0),
      0,
    ),
    lotData: data.rawtransactionlot_set.map((lot) => ({
      ...lot,
      raw_product: rawProducts.find((p) => p.value === lot.raw_product),
      lotDetail: lot.raw_lot_detail.map((detail) => ({
        ...detail,
        warehouse: warehouses.find((w) => w.value === detail.warehouse),
      })),
    })),
  }));
};
