export const customStyles = (columnName) => {
  return {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 100,
    }),
    control: (base, state) => ({
      ...base,
      width:
        columnName === "Product"
          ? "200px"
          : columnName === "Warehouse"
          ? "150px"
          : "",
    }),
  };
};
