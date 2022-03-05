import { isObject } from "../../../utils/objectUtils";

export const formatValues = (values) => {
  let newObject = { ...values };
  for (const key in newObject) {
    if (isObject(values[key])) {
      newObject[key] = values[key].value;
    }
  }
  return newObject;
};
