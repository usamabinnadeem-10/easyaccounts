import React from "react";

import { IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Tooltip } from "@mui/material";

const SkeletonIconButton = ({ loading, children, onClick, title }) => {
  return (
    <>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="text"
          height={40}
          width={40}
          sx={{
            ml: "auto",
            borderRadius: "4px",
          }}
        />
      ) : (
        <Tooltip arrow title={title} placement="right">
          <IconButton onClick={onClick}>{children}</IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SkeletonIconButton;
