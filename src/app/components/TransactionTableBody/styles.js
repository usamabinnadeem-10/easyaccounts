export const customStyles = (columnName) => {
  return {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 100,
    }),
    control: (base, state) => ({
      ...base,
      minWidth: "100px",
      width: "max-content",
    }),
  };
};
