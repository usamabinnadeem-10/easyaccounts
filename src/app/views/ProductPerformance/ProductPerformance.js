import React from "react";

import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Heading } from "./styled";

import CustomFilters from "../../containers/CustomFilters/CustomFilters";

import * as utils from "./utils";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";

const ProductPerformance = (props) => {
  const essentials = useSelector((state) => state.essentials);
  const [chartData, setChartData] = React.useState([]);

  const filters = React.useMemo(
    () => utils.getFilters(essentials),
    [essentials]
  );

  const onSearch = (data) => {
    setChartData(utils.formatDataForChart(data));
  };

  return (
    <>
      <Heading variant="h5" fontWeight={900}>
        Product Performance
      </Heading>
      <CustomFilters
        filters={filters}
        api={TRANSACTION_URLS.PRODUCT_PERFORMANCE}
        onSearch={onSearch}
      />
      <BarChart
        padding={{}}
        width={800}
        height={300}
        data={chartData}
        barSize={20}
        layout="vertical"
      >
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          scale="point"
          type="category"
          padding={{ top: 20, bottom: 20 }}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 4" />
        <Bar
          label={{ position: "center", fill: "#fff" }}
          dataKey="quantity"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
        <Bar
          dataKey="average"
          label={{ position: "center", fill: "#fff" }}
          fill="#464db3"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </>
  );
};

export default ProductPerformance;
