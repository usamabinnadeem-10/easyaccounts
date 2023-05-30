export const getFields = (essentials, formulas, isTransfer) => {
  let fields = [
    {
      field: 'quantity',
      type: 'number',
      label: 'Quantity',
      xs: 3,
    },
    {
      field: 'actual_gazaana',
      type: 'number',
      label: 'Stock Gazaana',
      xs: 3,
    },
    {
      field: 'expected_gazaana',
      type: 'number',
      label: 'Physical Gazaana',
      xs: 3,
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
      label: isTransfer ? 'To Warehouse' : 'Warehouse',
      options: essentials.warehouses,
      xs: 3,
    },
  ];
  if (isTransfer) {
    fields.splice(4, 0, {
      field: 'transferring_warehouse',
      type: 'select',
      label: 'From Warehouse',
      options: essentials.warehouses,
      xs: 2,
    });
  } else {
    fields.splice(3, 0, {
      field: 'rate_gazaana',
      type: 'number',
      label: 'Rate Gazaana',
      xs: 3,
    });
    fields.push({
      field: 'rate',
      type: 'number',
      label: 'Rate',
      xs: 2,
    });
  }
  return fields;
};

export const formatLotNumbers = (lotNumbers) =>
  lotNumbers.map((number) => ({
    value: number.id,
    label: `${number.lot_number}`,
  }));
