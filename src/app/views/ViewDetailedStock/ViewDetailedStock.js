import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';
import Printable from '../../containers/Printable';

import * as styled from './styled';
import * as utils from './utils';
import * as constants from './constants';
import { getFilters } from './filters';

import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

import { cacheDetailedStock } from '../../../store/cache';

const ViewDetailedStock = (props) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const detailedStockCache = useSelector(
    (state) => state.cache.detailedStockCache
  );
  let filters = useMemo(() => getFilters(essentials), [essentials]);

  const [formattedStock, setFormattedStock] = useState(
    detailedStockCache || []
  );
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (data) => {
    setIsEmpty(false);
    setIsLoading(true);
    let formatted = utils.formatDetailedStock(
      data,
      props.persons,
      props.warehouses
    );
    setFormattedStock(formatted);
    dispatch(cacheDetailedStock(formatted));
    setIsEmpty(formatted.length === 0);
    setIsLoading(false);
  };

  return (
    <styled.StyledGrid container direction='column'>
      <styled.StyledGrid mb={3} container justifyContent='space-between'>
        <Heading heading={'Detailed Stock'} />
      </styled.StyledGrid>

      <CustomFilters
        api={TRANSACTION_URLS.VIEW_DETAILED_STOCK}
        onSearch={handleSearch}
        filters={filters}
      />
      <Printable
        disablePrint={formattedStock.length === 0}
        documentTitle='Detailed Stock Report'>
        <styled.StyledGrid
          container
          direction='column'
          alignItems='center'
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
      </Printable>
    </styled.StyledGrid>
  );
};

export default ViewDetailedStock;
