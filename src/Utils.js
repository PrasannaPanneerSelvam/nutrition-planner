export const debounce = function debounce(func, delay = 300) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
