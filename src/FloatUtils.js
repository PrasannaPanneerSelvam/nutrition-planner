// Works upto 3 digit precision
const factor = 1000;

export const addFloatValues = (a, b) => {
  a *= factor;
  b *= factor;
  return (a + b) / factor;
};

export const multiplyFloatValues = (a, b) => {
  a *= factor;
  b *= factor;
  return (a * b) / (factor * factor);
};
