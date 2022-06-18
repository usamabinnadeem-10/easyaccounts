export const renameKeys = (oldKey, newKey, arr) => {
  arr.forEach((obj) => {
    if (oldKey !== newKey) {
      Object.defineProperty(
        obj,
        newKey,
        Object.getOwnPropertyDescriptor(obj, oldKey)
      );
      delete obj[oldKey];
    }
  });
  return arr;
};

export const isObject = (value) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};
