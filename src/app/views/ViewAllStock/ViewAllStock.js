import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useReactToPrint } from 'react-to-print';

import Select from 'react-select';

import CustomFilters from '../../containers/CustomFilters/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';

import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';

import { StyledPaper } from './styled';
import { useStyles, selectStyles } from './styles';
import { getColumns } from './constants';
import { formatStockData, getFilters } from './utils';
import { ESSENTIAL_URLS } from '../../../constants/restEndPoints';

import { getAllStock } from '../../../store/transactions/actions';
import instance from '../../../utils/axiosApi';
import { TRANSACTION_URLS } from '../../../constants/restEndPoints';

import { withSnackbar } from '../../hoc/withSnackbar';

const ViewAllStock = (props) => {
  const classes = useStyles();
  const componentRef = useRef();
  const dispatch = useDispatch();

  const stock = useSelector((state) => state.transactions);
  const allStock = useSelector((state) => state.transactions.allStock);
  const warehouses = useSelector((state) => state.essentials.warehouses);
  const products = useSelector((state) => state.essentials.products);
  const productCategories = useSelector(
    (state) => state.essentials.productCategories
  );

  let filters = useMemo(
    () => getFilters({ warehouses, products, productCategories }),
    [warehouses, products, productCategories]
  );

  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(null);
  const [toWarehouse, setToWarehouse] = useState(null);

  const handleTransferClick = (rowId) => {
    if (allStock.length > 0) {
      setCurrentStock(allStock.filter((stock) => stock.id === rowId)[0]);
      setIsModalOpen(true);
    }
  };

  const COLUMNS = useMemo(() => getColumns(handleTransferClick), [allStock]);

  useEffect(() => {
    if (stock.shouldFetchStock) {
      dispatch(getAllStock());
    }
    if (stock.fetched) {
      if (stock.allStock.length > 0) {
        setStockData(formatStockData(stock.allStock, props));
      }
      setLoading(false);
    }
  }, [stock.shouldFetchStock, stock.fetched]);

  useEffect(() => {
    if (allStock.length > 0) {
      setStockData(formatStockData(allStock, props));
      setLoading(false);
    }
  }, [allStock]);

  const makeTransfer = () => {
    instance
      .post(TRANSACTION_URLS.TRANSFER_STOCK, {
        id: currentStock.id,
        to_warehouse: toWarehouse.value,
        transfer_quantity: transferQuantity,
      })
      .then((response) => {
        setIsModalOpen(false);
        setCurrentStock(null);
        setTransferQuantity(null);
        props.showSuccessSnackbar('Stock transferred');
        dispatch(getAllStock());
      })
      .catch((error) => {
        props.showErrorSnackbar(
          error?.response?.data?.detail || 'Oops, something went wrong'
        );
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSearch = (data) => {
    setStockData(formatStockData(data, props));
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          paper='true'
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}>
          <StyledPaper>
            <Typography sx={{ mb: 2 }} variant='h5'>
              Transfer Stock
            </Typography>
            <Typography variant='body1'>
              Product: {props.products[currentStock.product].label}
            </Typography>
            <Typography variant='body1'>
              From Warehouse: {props.warehouses[currentStock.warehouse].label}
            </Typography>
            <Typography variant='body1'>
              Gazaana: {currentStock.yards_per_piece}
            </Typography>
            <Typography sx={{ mb: 2 }} variant='body1'>
              Stock: {currentStock.stock_quantity}
            </Typography>
            <Select
              styles={selectStyles()}
              value={toWarehouse}
              options={warehouses}
              placeholder='Transfer to Warehouse'
              onChange={(value) => setToWarehouse(value)}
            />
            <TextField
              label='Transfer Quantity'
              type='number'
              sx={{ my: 2 }}
              size='small'
              value={transferQuantity}
              helperText={`Quantity can not be greater than ${currentStock.stock_quantity}`}
              error={transferQuantity > currentStock.stock_quantity}
              InputProps={{
                inputProps: {
                  max: currentStock.stock_quantity,
                  min: 1,
                },
              }}
              onChange={(e) => setTransferQuantity(parseInt(e.target.value))}
            />
            <Button variant='contained' onClick={makeTransfer} fullWidth>
              TRANSFER
            </Button>
          </StyledPaper>
        </Modal>
      )}
      <CustomFilters
        api={ESSENTIAL_URLS.ALL_STOCK}
        filters={filters}
        onSearch={onSearch}
      />
      <div ref={componentRef} className={classes.root}>
        {stockData.length > 0 && (
          <Button
            onClick={handlePrint}
            sx={{ my: 3, displayPrint: 'none' }}
            variant='contained'
            color='secondary'>
            PRINT
          </Button>
        )}
        <Heading heading={'All Stock'} />
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

export default withSnackbar(ViewAllStock);
