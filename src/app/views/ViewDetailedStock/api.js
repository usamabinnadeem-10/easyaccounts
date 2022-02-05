import instance from "../../../utils/axiosApi";

import { TRANSACTION_URLS } from "../../../constants/restEndPoints";

export const getDetailedStock = (product, start, end, gazaana, warehouse) => {
  if (!product) {
    return;
  }
  let URL = `${TRANSACTION_URLS.VIEW_DETAILED_STOCK}?product=${product}${
    start ? "&start=" + start : ""
  }${end ? "&end=" + end : ""}${gazaana ? "&yards_per_piece=" + gazaana : ""}${
    warehouse ? "&warehouse=" + warehouse : ""
  }`;
  return instance.get(URL);
};
