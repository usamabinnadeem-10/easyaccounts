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
