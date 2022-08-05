import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { useReactToPrint } from 'react-to-print';

import Select from 'react-select';

import CustomFilters from '../../containers/CustomFilters';
import StartEndDate from '../../components/StartEndDate/StartEndDate';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';

import * as api from './api';
import * as styled from './styled';
import * as utils from './utils';
import * as constants from './constants';
import { getFilters } from './filters';

import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

const ViewDetailedStock = (props) => {
  const componentRef = useRef();

  const essentials = useSelector((state) => state.essentials);
  let filters = useMemo(() => getFilters(essentials), [essentials]);

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
          props.warehouses
        );
        setFormattedStock(formatted);
        setIsEmpty(formatted.length === 0);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleSearch = (data) => {
    setIsEmpty(false);
    setIsLoading(true);
    let formatted = utils.formatDetailedStock(
      data,
      props.persons,
      props.warehouses,
      warehouse
    );
    setFormattedStock(formatted);
    setIsEmpty(formatted.length === 0);
    setIsLoading(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <styled.StyledGrid container direction='column'>
      <styled.StyledGrid mb={3} container justifyContent='space-between'>
        <Heading heading={'Detailed Stock'} />
        <styled.StyledButton
          size='small'
          onClick={handlePrint}
          disabled={formattedStock.length === 0}>
          Print
        </styled.StyledButton>
      </styled.StyledGrid>

      <CustomFilters
        api={TRANSACTION_URLS.VIEW_DETAILED_STOCK}
        onSearch={handleSearch}
        filters={filters}
      />

      <styled.StyledGrid
        container
        direction='column'
        alignItems='center'
        ref={componentRef}
        mt={3}>
        {isEmpty ? (
          <Empty />
        ) : isLoading ? (
          <CustomLoader />
        ) : formattedStock.length > 0 ? (
          <CustomTable
            bordered
            columns={constants.COLUMNS}
            data={formattedStock}
          />
        ) : (
          <></>
        )}
      </styled.StyledGrid>
    </styled.StyledGrid>
  );
};

export default ViewDetailedStock;
