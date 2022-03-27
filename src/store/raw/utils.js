export const addProductToStore = (products, newProduct) => {
  if (products[newProduct.person]) {
    return {
      ...products,
      [newProduct.person]: [...products[newProduct.person], newProduct],
    };
  }
  return {
    ...products,
    [newProduct.person]: [newProduct],
  };
};

export const addListOfProductsToStore = (products, list) => {
  if (list.length > 0) {
    return {
      ...products,
      [list[0].person]: list,
    };
  }
  return products;
};
