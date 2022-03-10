import React from "react";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import SkeletonIconButton from "../../components/SkeletonIconButton";

import { BranchBox } from "./styled";
import { ButtonWrapper } from "./styled";

const Branch = ({ branch, index, onClick, loading }) => {
  const handleClick = () => {
    onClick(branch.branch_id);
  };

  return (
    <BranchBox bgcolor={index % 2 !== 0 ? "#ededed" : "#f7f7f7"}>
      <Grid item xs={9}>
        <Typography sx={{ fontWeight: 700 }} variant="body1">
          {branch.branch_name}
        </Typography>
      </Grid>
      <ButtonWrapper item xs={3}>
        <SkeletonIconButton
          loading={loading}
          onClick={handleClick}
          title="Open branch"
        >
          <OpenInNewIcon />
        </SkeletonIconButton>
      </ButtonWrapper>
    </BranchBox>
  );
};

export default Branch;
