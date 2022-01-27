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