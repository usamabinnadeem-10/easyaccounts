import React from 'react';

import { Offline, Online } from 'react-detect-offline';

import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';

import { styled } from '@mui/styles';

export const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const withInternetConnection = (Component) => {
  return (props) => {
    return (
      <>
        <Online>
          <Component {...props} />
        </Online>
        <Offline>
          <StyledDiv>
            <WifiOffRoundedIcon
              style={{ color: 'red', height: 200, width: 200 }}
            />
          </StyledDiv>
        </Offline>
      </>
    );
  };
};
