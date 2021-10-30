export const renameKeys = (oldKey, newKey, arr) => {
  console.log(arr);
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

export const groupByField = (arr, lookupField) => {
  let newObj = {};
  arr.forEach((elem) => {
    if (newObj.hasOwnProperty(elem[lookupField])) {
      newObj[elem[lookupField]].push(elem);
    } else {
      newObj[elem[lookupField]] = [elem];
    }
  });
  return newObj;
};
