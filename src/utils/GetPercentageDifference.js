function GetPercentageDifference(currentValue, previousValue) {
  const diff = (currentValue - previousValue) / previousValue;
  return diff * 100;
}

export default GetPercentageDifference;
