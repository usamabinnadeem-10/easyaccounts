import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { StyledBox } from "./styled";

const CustomTabs = ({ tabs, activeTab, handleChangeTab }) => {
  return (
    <StyledBox>
      <Tabs value={activeTab} onChange={handleChangeTab}>
        {tabs.map((tab, index) => (
          <Tab disableRipple key={index} label={tab.label} id={tab.id} />
        ))}
      </Tabs>
    </StyledBox>
  );
};

export default CustomTabs;
