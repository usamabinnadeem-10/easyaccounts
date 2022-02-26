import React from "react";

const CustomTabPanel = ({ children, activeTab, index }) => {
  return <div hidden={activeTab !== index}>{children}</div>;
};

export default CustomTabPanel;
