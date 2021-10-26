export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const makeQueryParamURL = (base, params) => {
  let URL = base + "?";
  params.forEach((element, index) => {
    if (element) {
      URL += `${index > 0 ? "&" : ""}${element.key}=${element.value}`;
    }
  });
  return URL;
};

export const makeDate = (date) => {
  return `${date.year}-${date.month}-${date.day}`;
};
