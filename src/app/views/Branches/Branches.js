import React, { useEffect } from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Branch from '../../components/Branch';
import Skeletons from './Skeletons';

import { BranchWrapper } from './styled';
import { StyledButton } from './styled';

import { login } from '../../../store/auth';
import { logout } from '../../../store/auth';

import * as routes from '../../../constants/routesConstants';

const Branches = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.hasToken && auth.isAuthenticated && !auth.loggingIn) {
      history.push(routes.VIEW_DAYBOOK);
    }
  }, [auth, history]);

  const handleLoginBranch = (branchId) => {
    setIsLoading(true);
    dispatch(
      login({
        branch_id: branchId,
      }),
    );
  };

  const handleLogoutBranch = () => {
    setIsLoading(true);
    dispatch(logout());
  };

  return (
    <BranchWrapper container direction="column">
      {auth.branches.map((branch, index) => (
        <Branch
          key={index}
          branch={branch}
          index={index}
          onClick={handleLoginBranch}
          loading={isLoading}
        />
      ))}
      {auth.branches.length === 0 && <Skeletons />}
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
