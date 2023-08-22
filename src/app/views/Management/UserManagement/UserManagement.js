import { Fragment, useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cacheUserBranchRelationList } from '../../../../store/cache';
import { setDialog } from '../../../../store/dialogs';

// Custom components
import Heading from '../../../components/Heading';

// MUI
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Utils
import instance from '../../../../utils/axiosApi';
import { AUTH_URLS } from '../../../../constants/restEndPoints';

// Styles
import { Container, GreyText, BoldText } from './styled';

// Constants
import { DIALOGS } from '../../../../constants/dialogIds';

const UserManagement = () => {
  const dispatch = useDispatch();
  const userBranchCache = useSelector(
    (state) => state.cache.userBranchRelationListCache,
  );

  useEffect(() => fetchData(), []);
  useEffect(() => console.log(userBranchCache), [userBranchCache]);

  const fetchData = async () => {
    const response = await instance.get(AUTH_URLS.USER_BRANCH_RELATIONS_LIST);
    dispatch(
      cacheUserBranchRelationList({
        userBranchRelations: response.data,
      }),
    );
  };

  const handleOpenUserEditModal = (data) =>
    dispatch(setDialog(DIALOGS.USER_BRANCH_EDIT, data));

  return (
    <Fragment>
      <Heading heading={'User Management'} />
      {userBranchCache?.userBranchRelations?.length > 0 ? (
        <Container>
          {userBranchCache.userBranchRelations.map((user) => (
            <div className="box">
              <IconButton
                onClick={() => handleOpenUserEditModal(user)}
                color="secondary"
                sx={{ position: 'absolute', right: 4, top: 4 }}
              >
                <EditIcon />
              </IconButton>
              <BoldText>{user.username}</BoldText>
              <GreyText sx={{ fontSize: '12px !important' }}>
                ({user.role})
              </GreyText>
              <BoldText>
                <span style={{ color: '#6868FE', fontWeight: 700 }}>
                  {user.permissions.length}
                </span>{' '}
                permissions
              </BoldText>
              <br />
              {user.is_active ? (
                <GreyText>Active ✅</GreyText>
              ) : (
                <GreyText>Inactive ❌</GreyText>
              )}
              {user.is_logged_in ? (
                <GreyText>Logged in ✅</GreyText>
              ) : (
                <GreyText>Logged out ❌</GreyText>
              )}
            </div>
          ))}
        </Container>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default UserManagement;
