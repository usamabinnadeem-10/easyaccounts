import moment from 'moment';

export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const makeQueryParamURL = (base, params) => {
  let URL = base + '?';
  params.forEach((element, index) => {
    if (element) {
      URL += `${index > 0 ? '&' : ''}${element.key}=${element.value}`;
    }
  });
  return URL;
};

export const getURL = (url, pathVariable, value) => {
  return url.replace(`:${pathVariable}`, value);
};

export const getReadableDate = (date) => {
  return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
};

export const getTimePeriod = (date, period) => {
  let formattedDate = moment(date);
  switch (period) {
    case 'day':
      return formattedDate.format('DD-MM-YYYY, ddd');
    case 'week':
      let weekNum = Math.ceil(formattedDate.date() / 7);
      return `Week ${weekNum}, ${formattedDate.format('MMMM')}`;
    case 'month':
      return formattedDate.format('MMMM');
    default:
      break;
  }
};

export const formatCurrency = (value, style = 'decimal', decimalPlaces = 2) =>
  new Intl.NumberFormat('en-IN', {
    style: style,
    currency: 'PKR',
    maximumFractionDigits: decimalPlaces,
  }).format(value);

export const convertDate = (
  from = 'YYYY-MM-DD HH:mm:ss',
  to = 'DD-MM-YYYY',
  date,
) => {
  return moment(date, from).format(to);
};

export const getToday = () => {
  return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
};

export const convertCurrencyToNumber = (currency) => {
  if (typeof currency === 'string' || currency instanceof String) {
    let amount = currency.replace(/[,]+/g, '');
    return parseFloat(amount);
  }
  return currency;
};
