// Shared navigation flags for coordinating behavior between screens
let shouldClearSearchOnFocus = false;

export const setShouldClearSearchOnFocus = (value: boolean) => {
  shouldClearSearchOnFocus = value;
};

export const getShouldClearSearchOnFocus = () => {
  return shouldClearSearchOnFocus;
};

export const consumeShouldClearSearchOnFocus = () => {
  const value = shouldClearSearchOnFocus;
  shouldClearSearchOnFocus = false;
  return value;
};

