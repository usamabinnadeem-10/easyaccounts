import React from "react";

import DotLoader from "react-spinners/DotLoader";

import { useStyles } from "./styles";

function CustomLoader({ loading, height = 50, radius, pageLoader }) {
  let classes = useStyles();
  if (pageLoader) {
    return (
      <div className={classes.loader}>
        <DotLoader
          loading={loading}
          height={height}
          radius={20}
          margin={2.5}
          width={5}
        />
      </div>
    );
  } else {
    return (
      <DotLoader
        loading={loading}
        height={height || 35}
        radius={radius || 20}
      />
    );
  }
}

export default CustomLoader;
