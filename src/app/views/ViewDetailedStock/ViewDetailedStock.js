import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { useSelector } from "react-redux";

import { useReactToPrint } from "react-to-print";

import Select from "react-select";

import StartEndDate from "../../components/StartEndDate/StartEndDate";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import Empty from "../../components/Empty/Empty";
import Heading from "../../components/Heading";

import { makeDate, getDateFromString } from "../../utilities/stringUtils";

import * as api from "./api";
import * as styled from "./styled";
import * as utils from "./utils";
import * as constants from "./constants";

const ViewDetailedStock = (props) => {
  const componentRef = useRef();

  const products = useSelector((state) => state.essentials.products);
  const warehouses = useSelector((state) => state.essentials.warehouses);

  const [product, setProduct] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [gazaana, setGazaana] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formattedStock, setFormattedStock] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsEmpty(false);
    setIsLoading(true);
    api
      .getDetailedStock(
        product?.value,
        startDate,
        endDate,
        gazaana,
        warehouse?.value
      )
      .then((response) => {
        let formatted = utils.formatDetailedStock(
          response.data,
          props.persons,
          props.warehouses,
          warehouse
        );
        setFormattedStock(formatted);
        setIsEmpty(formatted.length === 0);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <styled.StyledGrid container direction="column">
      <styled.StyledGrid mb={3} container justifyContent="space-between">
        <Heading heading={"Detailed Stock"} />
        <styled.StyledButton
          size="small"
          variant="contained"
          onClick={handlePrint}
          disabled={formattedStock.length === 0}
        >
          Print
        </styled.StyledButton>
      </styled.StyledGrid>

      <styled.StyledGrid
        align="center"
        mt={2}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <styled.StyledGrid mb={3} item xs={12} justifyContent="space-between">
          <Select
            escapeClearsValue
            isClearable
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 10000,
              }),
            }}
            options={products}
            value={product}
            placeholder="Select Product"
            onChange={(value) => setProduct(value)}
          />
          <Select
            escapeClearsValue
            isClearable
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 10000,
              }),
            }}
            options={warehouses}
            value={warehouse}
            placeholder="Select Warehouse"
            onChange={(value) => setWarehouse(value)}
          />
          <styled.StyledInput
            size="small"
            label="Gazaana"
            onChange={(e) => setGazaana(parseFloat(e.target.value))}
          />
        </styled.StyledGrid>
        <StartEndDate
          startDate={getDateFromString(startDate)}
          endDate={getDateFromString(endDate)}
          getStartDate={(value) => setStartDate(makeDate(value))}
          getEndDate={(value) => setEndDate(makeDate(value))}
        />

        <styled.StyledButton
          disabled={!product}
          variant="contained"
          onClick={handleClick}
        >
          Search
        </styled.StyledButton>
      </styled.StyledGrid>
      <styled.StyledGrid
        container
        direction="column"
        alignItems="center"
        ref={componentRef}
        mt={3}
      >
        {isEmpty ? (
          <Empty />
        ) : isLoading ? (
          <CustomLoader />
        ) : (
          <CustomTable
            bordered
            columns={constants.COLUMNS}
            data={formattedStock}
          />
        )}
      </styled.StyledGrid>
    </styled.StyledGrid>
  );
};

export default ViewDetailedStock;
