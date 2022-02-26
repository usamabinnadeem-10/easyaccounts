import React from "react";

import { Typography } from "@mui/material";

const Heading = ({ heading }) => {
  return (
    <Typography variant="h5" sx={{ mb: 2, fontWeight: 900 }}>
      {heading}
    </Typography>
  );
};

export default Heading;
