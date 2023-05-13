import CalculateImprovementPercentage from '../utils/CalculateImprovementPercentage';
import IsEffective from '../utils/IsEffective';
import FilterUniqueProducts from '../utils/FilterUniqueProducts';

const CreateStrategy = (
  id,
  name,
  products,
  beforeValue,
  afterValue,
  categories,
  subCategories
) => {
  const effectivenessThreshold = 10; // Replace this value with the desired threshold
  const improvementPercentage = CalculateImprovementPercentage(
    beforeValue,
    afterValue
  );

  const uniqueProducts = FilterUniqueProducts(products); // Filter unique products

  return {
    id,
    name,
    products: uniqueProducts,
    improvementPercentage,
    effective: IsEffective(improvementPercentage, effectivenessThreshold),
    categories,
    subCategories,
  };
};

export default CreateStrategy;
