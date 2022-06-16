export const getFields = (essentials, formulas, isTransfer) => {
  let fields = [
    {
      field: 'quantity',
      type: 'number',
      label: 'Quantity',
      xs: 1,
    },
    {
      field: 'actual_gazaana',
      type: 'number',
      label: 'Actual',
      xs: 1,
    },
    {
      field: 'expected_gazaana',
      type: 'number',
      label: 'Expected',
      xs: 1,
    },
    {
      field: 'formula',
      type: 'select',
      label: 'Formula',
      options: formulas,
      xs: 2,
    },
    {
      field: 'warehouse',
      type: 'select',
      label: 'Warehouse',
      options: essentials.warehouses,
      xs: 2,
    },
  ];
  if (isTransfer) {
    fields.push({
      field: 'to_warehouse',
      type: 'select',
      label: 'Transfer to',
      options: essentials.warehouses,
      xs: 2,
    });
  } else {
    fields.push({
      field: 'rate',
      type: 'number',
      label: 'Rate',
      xs: 1,
    });
  }
  return fields;
};

export const formatLotNumbers = (lotNumbers) =>
  lotNumbers.map((number) => ({
    value: number.id,
    label: `${number.lot_number}`,
  }));
