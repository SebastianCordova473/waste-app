const CalculateMAPE = (actual, predicted) => {
  let sum = 0;
  for (let i = 0; i < actual.length; i++) {
    const absoluteDiff = Math.abs(actual[i] - predicted[i]);
    const percentageError = (absoluteDiff / actual[i]) * 100;
    sum += percentageError;
  }
  return sum / actual.length;
};

export default CalculateMAPE;
