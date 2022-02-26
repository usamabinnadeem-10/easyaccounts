import React from "react";
import { useState } from "react";

import { Grid } from "@mui/material";

import CustomTabs from "../../components/CustomTabs";
import CustomTabPanel from "../../components/CustomTabPanel";
import IssuePersonalCheque from "../../containers/IssuePersonalCheque";

import { TABS } from "./constants";

const PersonalCheques = (props) => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Grid sx={{ ml: 3 }} container direction="column">
      <CustomTabs
        activeTab={activeTab}
        handleChangeTab={handleChange}
        tabs={TABS}
      />
      <CustomTabPanel activeTab={activeTab} index={0}>
        <IssuePersonalCheque />
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={1}>
        <h3>2</h3>
      </CustomTabPanel>
      <CustomTabPanel activeTab={activeTab} index={2}>
        <h3>3</h3>
      </CustomTabPanel>
    </Grid>
  );
};

export default PersonalCheques;
