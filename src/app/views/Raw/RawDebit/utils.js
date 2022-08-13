export const formatForm = (form) => ({
  ...form,
  person: form.person.value,
  data: form.data.map((d) => ({
    purchase_lot_number: d.purchase_lot_number.value,
    detail: d.detail.map((det) => ({
      ...det,
      formula: det.formula.value,
      warehouse: det.warehouse.value,
    })),
  })),
});
