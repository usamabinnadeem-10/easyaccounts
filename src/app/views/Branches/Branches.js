import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Branch from "../../components/Branch";
import Skeletons from "./Skeletons";

import { BranchWrapper } from "./styled";
import { StyledButton } from "./styled";

import { login } from "../../../store/auth";
import { logout } from "../../../store/auth";

const Branches = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.auth.branches);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginBranch = (branchId) => {
    setIsLoading(true);
    dispatch(
      login({
        branch_id: branchId,
      })
    );
  };

  const handleLogoutBranch = () => {
    setIsLoading(true);
    dispatch(logout());
  };

  return (
    <BranchWrapper container direction="column">
      {branches.map((branch, index) => (
        <Branch
          key={index}
          branch={branch}
          index={index}
          onClick={handleLoginBranch}
          loading={isLoading}
        />
      ))}
      {branches.length === 0 && <Skeletons />}
      <StyledButton
        onClick={handleLogoutBranch}
        color="error"
        variant="contained"
        loading={isLoading}
      >
        Logout
      </StyledButton>
    </BranchWrapper>
  );
};

export default Branches;
