import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import ChequeList from '../../components/ChequeList';
import CustomFilters from '../../containers/CustomFilters';
import CustomTabs from '../../components/CustomTabs';
import CustomTabPanel from '../../components/CustomTabPanel';
import IssuePersonalCheque from '../../containers/IssuePersonalCheque';
import Heading from '../../components/Heading';
import Empty from '../../components/Empty';

import { TABS } from './constants';
import { getFilters } from './utils';
import { CHEQUE_URLS } from '../../../constants/restEndPoints';

const PersonalCheques = (props) => {
  const essentials = useSelector((state) => state.essentials);

  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [cheques, setCheques] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Grid
      sx={{ ml: props.dimensions.width < 900 ? '0px' : 2 }}
      container
      direction='column'>
      <Heading heading={'Personal Cheques'} />
      <CustomTabs
        activeTab={activeTab}
        handleChangeTab={handleChange}
        tabs={TABS}
      />
      <CustomTabPanel activeTab={activeTab} index={0}>
        <CustomFilters
          api={CHEQUE_URLS.PERSONAL.LIST}
          filters={getFilters(essentials)}
          onSearch={(data) => {
            setCheques(data);
            data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
          }}
        />
        {cheques.length > 0 && (
          <ChequeList
            cheques={cheques}
            isPersonal
            persons={props.persons}
            accounts={props.accounts}
          />
        )}
        {isEmpty && <Empty />}
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={1}>
        <IssuePersonalCheque />
      </CustomTabPanel>
    </Grid>
  );
};

export default PersonalCheques;
