import React from "react";
import { useState } from "react";

import CustomTabs from "../../components/CustomTabs";
import CustomTabPanel from "../../components/CustomTabPanel";
import Heading from "../../components/Heading";
import ExternalChequeEntry from "../../containers/ExternalChequeEntry";

import { Grid } from "@mui/material";

import { TABS } from "./constants";

const ExternalCheques = () => {
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
    </Grid>
  );
};

export default ExternalCheques;
