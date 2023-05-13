import CreateStrategy from './CreateStrategy';
import {v4 as uuidv4} from 'uuid';
const getCategoriesAndSubCategories = (filteredProducts, data) => {
  const categories = [];
  const subCategories = [];

  filteredProducts.forEach((product) => {
    const index = data.products.indexOf(product);
    if (index >= 0) {
      const category = data.categories[index];
      const subCategory = data.subCategories[index];

      if (!categories.some((cat) => cat.id === category.id)) {
        categories.push(category);
      }

      if (!subCategories.some((subCat) => subCat.id === subCategory.id)) {
        subCategories.push(subCategory);
      }
    }
  });

  return {categories, subCategories};
};

const filterProducts = (data, filterFn) =>
  data.products.filter((product, i) => filterFn(data, product, i));

const RecommendStrategies = (data) => {
  const strategies = [];

  const highDemandHighMarginProducts = filterProducts(
    data,
    (data, product, i) =>
      data.demands[i] > data.offers[i] && data.sales[i] > data.wastes[i]
  );
  const lowDemandLowMarginProducts = filterProducts(
    data,
    (data, product, i) =>
      data.demands[i] < data.offers[i] && data.sales[i] > data.wastes[i]
  );
  const highWasteProducts = filterProducts(
    data,
    (data, product, i) => data.wastes[i] > data.sales[i] * 0.1
  );
  const highDemandLowOfferProducts = filterProducts(
    data,
    (data, product, i) => data.demands[i] > data.offers[i] * 1.5
  );
  const lowSalesHighWasteProducts = filterProducts(
    data,
    (data, product, i) =>
      data.sales[i] < data.sales.reduce((a, b) => a + b) / data.sales.length &&
      data.wastes[i] > data.wastes.reduce((a, b) => a + b) / data.wastes.length
  );

  const calculateValue = (products, data) =>
    products.reduce((acc, product) => {
      const index = data.products.indexOf(product);
      if (index >= 0) {
        acc += data.sales[index] - data.wastes[index];
      }
      return acc;
    }, 0);

  // ...

  const {
    categories: highDemandHighMarginCategories,
    subCategories: highDemandHighMarginSubCategories,
  } = getCategoriesAndSubCategories(highDemandHighMarginProducts, data);

  strategies.push(
    CreateStrategy(
      uuidv4(),
      'Aumentar oferta de productos con alta demanda y márgenes de ganancia',
      highDemandHighMarginProducts,
      calculateValue(highDemandHighMarginProducts, data),
      calculateValue(highDemandHighMarginProducts, data) * 1.2,
      highDemandHighMarginCategories,
      highDemandHighMarginSubCategories
    )
  );

  const {
    categories: lowDemandLowMarginCategories,
    subCategories: lowDemandLowMarginSubCategories,
  } = getCategoriesAndSubCategories(lowDemandLowMarginProducts, data);
  strategies.push(
    CreateStrategy(
      uuidv4(),
      'Reducir oferta de productos con baja demanda y bajos márgenes de ganancia',
      lowDemandLowMarginProducts,
      calculateValue(lowDemandLowMarginProducts, data),
      calculateValue(lowDemandLowMarginProducts, data) * 1.2,
      lowDemandLowMarginCategories,
      lowDemandLowMarginSubCategories
    )
  );

  const {
    categories: highWasteCategories,
    subCategories: highWasteSubCategories,
  } = getCategoriesAndSubCategories(highWasteProducts, data);
  strategies.push(
    CreateStrategy(
      uuidv4(),
      'Mejorar la calidad del producto para reducir las Wastes',
      highWasteProducts,
      calculateValue(highWasteProducts, data),
      calculateValue(highWasteProducts, data) * 1.1,
      highWasteCategories,
      highWasteSubCategories
    )
  );

  const {
    categories: highDemandLowOfferCategories,
    subCategories: highDemandLowOfferSubCategories,
  } = getCategoriesAndSubCategories(highDemandLowOfferProducts, data);
  strategies.push(
    CreateStrategy(
      uuidv4(),
      'Promocionar productos con alta demanda y baja oferta',
      highDemandLowOfferProducts,
      calculateValue(highDemandLowOfferProducts, data),
      calculateValue(highDemandLowOfferProducts, data) * 1.3,
      highDemandLowOfferCategories,
      highDemandLowOfferSubCategories
    )
  );

  const {
    categories: lowSalesHighWasteCategories,
    subCategories: lowSalesHighWasteSubCategories,
  } = getCategoriesAndSubCategories(lowSalesHighWasteProducts, data);
  strategies.push(
    CreateStrategy(
      uuidv4(),
      'Eliminar productos con bajo rendimiento en ventas y Wastes altas',
      lowSalesHighWasteProducts,
      calculateValue(lowSalesHighWasteProducts, data),
      calculateValue(lowSalesHighWasteProducts, data) * 0.5,
      lowSalesHighWasteCategories,
      lowSalesHighWasteSubCategories
    )
  );

  return strategies;
};

export default RecommendStrategies;
