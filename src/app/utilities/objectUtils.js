import { isObject } from '../../utils/objectUtils';

export const findErrorMessage = (error) => {
  if (error) {
    if (isObject(error)) {
      if (Object.entries(error).length > 0) {
        return findErrorMessage(error[Object.keys(error)[0]]);
      }
    } else if (Array.isArray(error)) {
      return error[0];
    } else if (typeof error === 'string') {
      return error;
    }
  } else {
    return 'Oops, something went wrong';
  }
};

export const isArrayOfObjectsUnique = (array, keys) => {
  let uniques = new Set(
    array.map((obj) => keys.map((key) => JSON.stringify(obj[key])).join(' | '))
  );
  return array.length === uniques.size;
};

export const isObjectDirty = (obj) => {
  for (let key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
};

export const findDuplicatesInArrayOfObjects = (array, keys) => {
  let keysMap = {};
  let dups = false;
  array.forEach((element, index) => {
    let key = keys.map((key) => JSON.stringify(element[key])).join('|');
    if (!keysMap[key]) {
      keysMap[key] = [index];
    } else {
      dups = true;
      keysMap[key] = [...keysMap[key], index];
    }
  });

  let dupArray = [];
  for (let key in keysMap) {
    if (keysMap[key].length > 1) {
      dupArray.push(keysMap[key]);
    }
  }
  return dups ? dupArray : null;
};
