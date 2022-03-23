import React from "react";

import Heading from "../../components/Heading";

import { Wrapper } from "./styled";

const ViewWrapper = ({ children, heading, padding, marginBottom }) => {
  return (
    <Wrapper padding={padding} marginbottom={marginBottom}>
      <Heading heading={heading} />
      {children}
    </Wrapper>
  );
};

export default ViewWrapper;
