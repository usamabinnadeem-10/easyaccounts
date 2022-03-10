import React from "react";

import { Skeleton } from "@mui/material";

import { SkeletonWrapper } from "./styled";

const Skeletons = () => {
  return (
    <>
      {[1, 2].map((val, index) => (
        <SkeletonWrapper key={index}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={24}
            width={180}
          />
        </SkeletonWrapper>
      ))}
    </>
  );
};

export default Skeletons;
