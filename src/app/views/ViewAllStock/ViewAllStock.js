import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';
import Printable from '../../containers/Printable';

import { getColumns } from './constants';
import { formatStockData, getFilters } from './utils';
import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

import { getAllStock } from '../../../store/transactions';
import { cacheAllStock } from '../../../store/cache';

import { withSnackbar } from '../../hoc/withSnackbar';

const ViewAllStock = (props) => {
  const dispatch = useDispatch();

  const stock = useSelector((state) => state.transactions);
  const allStock = useSelector((state) => state.transactions.allStock);
  const warehouses = useSelector((state) => state.essentials.warehouses);
  const products = useSelector((state) => state.essentials.products);
  const productCategories = useSelector(
    (state) => state.essentials.productCategories
  );
  const allStockCache = useSelector((state) => state.cache.allStockCache);

  let filters = useMemo(
    () => getFilters({ warehouses, products, productCategories }),
    [warehouses, products, productCategories]
  );

  const [stockData, setStockData] = useState(allStockCache || []);
  const [loading, setLoading] = useState(true);

  const COLUMNS = useMemo(() => getColumns(), [allStock]);

  useEffect(() => {
    if (stock.shouldFetchStock) {
      dispatch(getAllStock());
    }
    if (stock.fetched) {
      if (allStockCache?.length > 0) {
        setStockData(allStockCache);
      } else if (stock.allStock.length > 0) {
        setStockData(formatStockData(stock.allStock, props));
      }
      setLoading(false);
    }
  }, [stock.shouldFetchStock, stock.fetched]);

  useEffect(() => {
    if (allStockCache) {
      setStockData(allStockCache);
    } else if (allStock.length > 0) {
      setStockData(formatStockData(allStock, props));
      setLoading(false);
    }
  }, [allStock]);

  const onSearch = (data) => {
    setStockData(formatStockData(data, props));
    dispatch(cacheAllStock(formatStockData(data, props)));
  };

  return (
    <>
      <Heading heading={'All Stock'} />
      <CustomFilters
        api={TRANSACTION_URLS.ALL_STOCK}
        filters={filters}
        onSearch={onSearch}
      />
      <Printable
        documentTitle={'All Stock Report'}
        disablePrint={stockData.length === 0}>
        {stockData.length > 0 ? (
          <CustomTable columns={COLUMNS} data={stockData} />
        ) : (
          <Empty />
        )}
      </Printable>
      {loading && <CustomLoader pageLoader loading={loading} />}
    </>
  );
};

export default withSnackbar(ViewAllStock);
