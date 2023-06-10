export const formatTransactionData = (transactions, hashes) => {
  const { persons } = hashes;
  return transactions.map((data) => ({
    ...data,
    party: persons?.[data.person],
    numLots: data.lots.length,
    numThaans: data.lots.reduce(
      (prev, curr) =>
        prev +
        curr.lot_detail.reduce((prev2, curr2) => prev2 + curr2.quantity, 0),
      0,
    ),
  }));
};
