import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { useReactToPrint } from "react-to-print";

import CustomTable from "../../components/CustomTable/CustomTable";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Empty from "../../components/Empty/Empty";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import { useStyles } from "./styles";
import instance from "../../../utils/axiosApi";
import { ESSENTIAL_URLS } from "../../../constants/restEndPoints";
import { COLUMNS } from "./constants";
import { formatStockData } from "./utils";

const ViewAllStock = (props) => {
  const classes = useStyles();
  const componentRef = useRef();

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get(ESSENTIAL_URLS.ALL_STOCK)
      .then((response) => {
        setStockData(formatStockData(response.data, props));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div ref={componentRef} className={classes.root}>
        {stockData.length > 0 && (
          <Button
            onClick={handlePrint}
            sx={{ my: 3, displayPrint: "none" }}
            variant="contained"
            color="secondary"
          >
            PRINT
          </Button>
        )}

        <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
          All Stock
        </Typography>
        {stockData.length > 0 ? (
          <CustomTable columns={COLUMNS} data={stockData} />
        ) : (
          <Empty />
        )}
      </div>
      {loading && <CustomLoader pageLoader loading={loading} />}
    </>
  );
};

export default ViewAllStock;
