import React from 'react';

import { TotalText } from './styled';

const Total = ({ variant, index, text }) => {
  return (
    <TotalText variant={variant || 'caption'} key={index}>
      {text.label} : {text.value}
    </TotalText>
  );
};

export default Total;
