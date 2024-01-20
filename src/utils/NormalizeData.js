const NormalizeData = (data, minValue, maxValue) => {
  return data.map((value) => (value - minValue) / (maxValue - minValue));
};

export default NormalizeData;
