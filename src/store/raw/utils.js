export const formatRawProducts = (products) => {
  if (Array.isArray(products)) {
    return products.map((product) => ({
      ...product,
      label: `${product.name} - ${product.type}`,
    }));
  }
  return {
    ...products,
    label: `${products.name} - ${products.type}`,
  };
};

export const formatFormulas = (formulas) => {
  return formulas.map((formula) => ({
    ...formula,
    value: formula.id,
    label: `${formula.numerator}/${formula.denominator}`,
  }));
};
