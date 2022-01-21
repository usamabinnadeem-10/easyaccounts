import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import CustomTable from "../../components/CustomTable/CustomTable";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

import { Typography } from "@mui/material";

import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { findItemInArray } from "../../../utils/arrayUtils";
import { ESSENTIAL_URLS } from "../../../constants/restEndPoints";
import { COLUMNS } from "./constants";

const ViewAllStock = () => {
  const classes = useStyles();

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => state.essentials.products);
  const warehouses = useSelector((state) => state.essentials.warehouses);

  const formatStockData = (data) => {
    let newStockData = data.map((stockData) => {
      return {
        ...stockData,
        product: findItemInArray(stockData.product, products, 'value').label,
        warehouse: findItemInArray(stockData.warehouse, warehouses, 'value').label,
      }
    })
    return newStockData;
  };

  useEffect(() => {
    instance
      .get(ESSENTIAL_URLS.ALL_STOCK)
      .then((response) => {
        setStockData(formatStockData(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
          All Stock
        </Typography>
        {stockData.length > 0 && (
          <CustomTable columns={COLUMNS} data={stockData} />
        )}
      </div>
      {loading && <CustomLoader pageLoader loading={loading} />}
    </>
  );
};

export default ViewAllStock;
