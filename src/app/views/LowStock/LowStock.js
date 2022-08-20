import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CustomFilters from '../../containers/CustomFilters';
import Heading from '../../components/Heading';
import CustomTable from '../../components/CustomTable';
import Printable from '../../containers/Printable';

import { getFilters } from './filters';
import { formatData } from './utils';
import { COLUMNS } from './table';
import { REPORTS_APIS } from '../../../constants/restEndPoints';

import { cacheLowStock } from '../../../store/cache';

const LowStock = ({ products, warehouses }) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);
  const filters = useMemo(() => getFilters(essentials), [essentials]);
  const cache = useSelector((state) => state.cache.lowStockCache);

  const [data, setData] = useState(cache || []);

  const handleSearch = (data) => {
    let formatted_data = formatData(data, products, warehouses);
    setData(formatted_data);
    dispatch(cacheLowStock(formatted_data));
  };

  return (
    <>
      <Heading heading='Low Stock' />
      <CustomFilters
        filters={filters}
        api={REPORTS_APIS.LOW_STOCK}
        onSearch={handleSearch}
      />
      <Printable
        documentTitle='Low Stock Report'
        disablePrint={data.length === 0}>
        {data.length ? <CustomTable columns={COLUMNS} data={data} /> : <></>}
      </Printable>
    </>
  );
};

export default LowStock;
