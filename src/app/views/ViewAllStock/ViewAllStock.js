import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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

  useEffect(() => {
    instance
      .get(TRANSACTION_URLS.ALL_STOCK)
      .then((res) => {
        setStockData(
          res.data.map((element, index) => {
            return {
              ...element,
              id: index,
            };
          })
        );
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
