import { FIELDS } from "../../containers/CustomFilters/constants";

export const getFilters = (essentials) => {
  return [
    {
      qp: "product",
      options: essentials.products,
      type: FIELDS.SELECT,
      placeholder: "Product",
    },
    {
      qp: "person",
      options: essentials.customers,
      type: FIELDS.SELECT,
      placeholder: "Customer",
    },
    {
      qp: "start",
      type: FIELDS.DATE,
      placeholder: "Start Date",
    },
    {
      qp: "end",
      type: FIELDS.DATE,
      placeholder: "End Date",
    },
  ];
};

export const formatDataForChart = (data) => {
  return data.map((val) => ({
    name: val.product__name,
    quantity: val.quantity_sold,
    average: val.average_rate,
  }));
};
