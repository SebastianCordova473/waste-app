const CalculateImprovementPercentage = (beforeValue, afterValue) => {
  return ((afterValue - beforeValue) / beforeValue) * 100;
};
export default CalculateImprovementPercentage;
