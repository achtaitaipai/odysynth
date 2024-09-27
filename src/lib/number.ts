export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(min, value), max);
};

export const round = (val: number, decimal: number) =>
  Math.floor(val * 10 ** decimal) / 10 ** decimal;
