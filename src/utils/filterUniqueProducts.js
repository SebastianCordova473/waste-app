const FilterUniqueProducts = (products) => {
  const uniqueProducts = [];
  const productIds = new Set();

  products.forEach((product) => {
    if (!productIds.has(product.id)) {
      uniqueProducts.push(product);
      productIds.add(product.id);
    }
  });

  return uniqueProducts;
};

export default FilterUniqueProducts;
