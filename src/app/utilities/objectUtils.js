export const findErrorMessage = (error) => {
  if (error) {
    if (Object.entries(error).length > 0) {
      let errors = Object.entries(error);
      return errors[0]?.[1];
    }
  } else {
    return "Oops, something went wrong";
  }
};
