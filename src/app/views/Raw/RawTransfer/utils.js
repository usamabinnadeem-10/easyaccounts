export const formatForm = (form) => {
  return {
    ...form,
    from_warehouse: form.from_warehouse.value,
    data: form.data.map((d) => ({
      purchase_lot_number: d.purchase_lot_number.value,
      detail: d.detail.map((det) => ({
        ...det,
        formula: det.formula.value,
        warehouse: det.warehouse.value,
      })),
    })),
  };
};
