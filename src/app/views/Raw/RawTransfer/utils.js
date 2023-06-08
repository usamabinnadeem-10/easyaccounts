export const formatForm = (form) => ({
  ...form,
  data: form.data.map((d) => ({
    lot_number: d.lot_number.value,
    detail: d.detail.map((det) => ({
      ...det,
      // formula: det.formula.value,
      warehouse: det.warehouse.value,
      transferring_warehouse: det.transferring_warehouse.value,
    })),
  })),
});

export const formatTransferForEditing = (transaction, essentials) => {
  const { warehouses } = essentials;
  return {
    ...transaction,
    data: transaction.rawtransferlot_set.map((lot) => {
      return {
        ...lot,
        lot_number: {
          value: lot.lot_number,
          label: lot.lot_number,
          lotId: lot.id,
        },
        detail: lot.rawtransferlotdetail_set.map((detail) => {
          return {
            ...detail,
            warehouse: warehouses.find((w) => w.value === detail.warehouse),
            transferring_warehouse: warehouses.find(
              (w) => w.value === detail.transferring_warehouse,
            ),
          };
        }),
      };
    }),
  };
};
