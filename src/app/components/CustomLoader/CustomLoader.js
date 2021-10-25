import React from "react";

import ScaleLoader from "react-spinners/ScaleLoader";

import { useStyles } from "./styles";

function CustomLoader(props) {
  const { loading, height, pageLoader } = props;
  let classes = useStyles();
  if (pageLoader) {
    return (
      <div className={classes.loader}>
        <ScaleLoader
          loading={loading}
          height={height || 50}
          radius={20}
          margin={2.5}
          width={5}
        />
      </div>
    );
  } else {
    return <ScaleLoader loading={loading} height={height || 35} radius={20} />;
  }
}

export default CustomLoader;
