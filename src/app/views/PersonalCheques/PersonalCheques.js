import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import ChequeList from "../../components/ChequeList";
import CustomFilters from "../../containers/CustomFilters";
import CustomTabs from "../../components/CustomTabs";
import CustomTabPanel from "../../components/CustomTabPanel";
import IssuePersonalCheque from "../../containers/IssuePersonalCheque";
import Heading from "../../components/Heading";

import { TABS } from "./constants";
import { getFilters } from "./utils";
import { CHEQUE_URLS } from "../../../constants/restEndPoints";

const PersonalCheques = (props) => {
  const essentials = useSelector((state) => state.essentials);

  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [cheques, setCheques] = useState([]);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Grid sx={{ ml: 2 }} container direction="column">
      <Heading heading={"Personal Cheques"} />
      <CustomTabs
        activeTab={activeTab}
        handleChangeTab={handleChange}
        tabs={TABS}
      />
      <CustomTabPanel activeTab={activeTab} index={0}>
        <IssuePersonalCheque />
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={1}>
        <CustomFilters
          api={CHEQUE_URLS.PERSONAL.LIST}
          filters={getFilters(essentials)}
          onSearch={(data) => setCheques(data)}
        />
        {cheques.length > 0 && (
          <ChequeList
            cheques={cheques}
            isPersonal
            persons={props.persons}
            accounts={props.accounts}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={2}>
        <h3>3</h3>
      </CustomTabPanel>
    </Grid>
  );
};

export default PersonalCheques;
