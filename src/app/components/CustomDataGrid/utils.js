export const prepareColumns = (columns) => {
  return columns.map((column) => {
    return {
      ...column,
      width: column.width || 150,
    };
  });
};

export const prepareRows = (rows) => {
  return rows.map((row, index) => {
    return {
      ...row,
      id: index,
    };
  });
};
