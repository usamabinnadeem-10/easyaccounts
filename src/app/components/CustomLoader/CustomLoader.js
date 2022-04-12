import React from 'react';

import BarLoader from 'react-spinners/BarLoader';

import { useStyles } from './styles';

function CustomLoader({ loading, pageLoader }) {
  let classes = useStyles();
  if (pageLoader) {
    return (
      <div className={classes.loader}>
        <BarLoader speedMultiplier={1.5} />
      </div>
    );
  } else {
    return <BarLoader speedMultiplier={1.5} loading={loading} />;
  }
}

export default CustomLoader;
