import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import ChequeList from "../../components/ChequeList";
import CustomFilters from "../../containers/CustomFilters";
import CustomTabs from "../../components/CustomTabs";
import CustomTabPanel from "../../components/CustomTabPanel";
import Heading from "../../components/Heading";
import ExternalChequeEntry from "../../containers/ExternalChequeEntry";

import { Grid } from "@mui/material";

import { TABS } from "./constants";
import { getFilters } from "./utils";
import { CHEQUE_URLS } from "../../../constants/restEndPoints";

const ExternalCheques = (props) => {
  const essentials = useSelector((state) => state.essentials);

  const [cheques, setCheques] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Grid sx={{ ml: 2 }} container direction="column">
      <Heading heading={"Party Cheques"} />
      <CustomTabs
        tabs={TABS}
        activeTab={activeTab}
        handleChangeTab={handleChange}
      />

      <CustomTabPanel activeTab={activeTab} index={0}>
        <ExternalChequeEntry />
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={1}>
        <CustomFilters
          api={CHEQUE_URLS.EXTERNAL.LIST}
          filters={getFilters(essentials)}
          onSearch={(data) => setCheques(data)}
        />
        {cheques.length > 0 && (
          <ChequeList
            cheques={cheques}
            persons={props.persons}
            accounts={props.accounts}
          />
        )}
      </CustomTabPanel>
    </Grid>
  );
};

export default ExternalCheques;
