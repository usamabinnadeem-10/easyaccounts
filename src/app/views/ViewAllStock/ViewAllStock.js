import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import CustomTable from "../../components/CustomTable/CustomTable";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

import { Typography } from "@mui/material";

import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";
import { COLUMNS } from "./constants";

const ViewAllStock = () => {
  const classes = useStyles();

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => state.essentials.products);

  const formatStockData = (data) => {
    let newStockData = [];
    for (let key in data) {
      for (let head in products) {
        products[head].forEach((element) => {
          if (element.value === key) {
            let qIn = data[key].C || 0;
            let qOut = data[key].D || 0;
            newStockData.push({
              id: key,
              product: `${element.head_name} / ${element.label}`,
              quantity_in: qIn,
              quantity_out: qOut,
              quantity: qIn - qOut,
              quantity_gazaana: (qIn - qOut) * element.basic_unit,
            });
            return;
          }
        });
      }
    }
    return newStockData;
  };

  useEffect(() => {
    instance
      .get(TRANSACTION_URLS.ALL_STOCK)
      .then((res) => {
        setStockData(formatStockData(res.data));
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
