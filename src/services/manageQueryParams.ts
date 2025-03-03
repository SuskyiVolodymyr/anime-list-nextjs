type Value = {
  key: string;
  value: string;
};

export function manageQueryParams(values: Value[]) {
  const currentParams = new URLSearchParams(window.location.search);
  for (const { key, value } of values) {
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
  }
  return currentParams.toString();
}
