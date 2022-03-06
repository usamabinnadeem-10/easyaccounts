import { isObject } from "../../utils/objectUtils";

export const findErrorMessage = (error) => {
  if (error) {
    if (isObject(error)) {
      if (Object.entries(error).length > 0) {
        return findErrorMessage(error[Object.keys(error)[0]]);
      }
    } else if (Array.isArray(error)) {
      return error[0];
    } else if (typeof error === "string") {
      return error;
    }
  } else {
    return "Oops, something went wrong";
  }
};
