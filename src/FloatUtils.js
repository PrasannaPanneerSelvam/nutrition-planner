// Works upto 3 digit precision
const factor = 1000;

const splitAndDo = (a, factor) => {
  const facLength = (factor + "").length - 1;
  const [w, d] = (a + "").split(".");
  return parseInt(w + (d ?? "").padEnd(facLength, "0"));
};

export const addFloatValues = (a, b) => {
  a = splitAndDo(a, factor);
  b = splitAndDo(b, factor);
  return (a + b) / factor;
};

export const multiplyFloatValues = (a, b) => {
  a = splitAndDo(a, factor);
  b = splitAndDo(b, factor);
  return (a * b) / (factor * factor);
};
