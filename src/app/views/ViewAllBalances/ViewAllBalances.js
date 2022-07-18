import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';

import { useReactToPrint } from 'react-to-print';

import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable/CustomTable';
import Empty from '../../components/Empty/Empty';
import Heading from '../../components/Heading';

import { Button } from '@mui/material';

import { useStyles } from './styles';
import { REPORTS_APIS } from '../../../constants/restEndPoints';
import { COLUMNS } from './constants';
import { formatBalances } from './utils';
import { getFilters } from './filters';

import { withSnackbar } from '../../hoc/withSnackbar';

const Balances = ({ showErrorSnackbar, role, persons }) => {
  const classes = useStyles();
  const componentRef = useRef();

  let filters = useMemo(() => getFilters(role), [role]);

  const [balancesData, setBalancesData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSearch = (data) => {
    let formattedBalances = formatBalances(data, persons);
    setBalancesData(formattedBalances);
    setIsEmpty(formattedBalances.length === 0);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className={classes.root}>
        <div className={classes.headerWrapper}>
          <Heading heading={'View All Balances'} />
          <Button
            disabled={balancesData.length === 0}
            onClick={handlePrint}
            variant='contained'
            color='secondary'>
            PRINT
          </Button>
        </div>
        <CustomFilters
          api={REPORTS_APIS.ALL_BALANCES}
          filters={filters}
          onSearch={handleSearch}
        />
        <div ref={componentRef}>
          {balancesData.length > 0 && (
            <CustomTable data={balancesData} columns={COLUMNS} />
          )}
        </div>
        {isEmpty && <Empty />}
      </div>
    </>
  );
};

export default withSnackbar(Balances);
