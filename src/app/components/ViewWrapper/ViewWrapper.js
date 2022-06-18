import React from 'react';

import Heading from '../../components/Heading';

import { Wrapper } from './styled';

const ViewWrapper = ({
  children,
  heading,
  padding,
  marginBottom,
  width,
  overridewidth = null,
}) => {
  return (
    <Wrapper
      overridewidth={overridewidth}
      width={width}
      padding={padding}
      marginbottom={marginBottom}>
      <Heading heading={heading} />
      {children}
    </Wrapper>
  );
};

export default ViewWrapper;
