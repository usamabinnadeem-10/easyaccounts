import React, { useMemo, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../../../store/dialogs';

import { Dialog } from '@mui/material';

import PermissionsForm from './PermissionsForm';

import { DIALOGS } from '../../../constants/dialogIds';

import instance from '../../../utils/axiosApi';
import { AUTH_URLS } from '../../../constants/restEndPoints';
import { cacheUserBranchRelationList } from '../../../store/cache';

import { Container, BoldText, Button } from './styled';
import { getCurrentPermissionArray } from '../../utilities/formUtils';

const UserBranchRelationEditModal = () => {
  const dispatch = useDispatch();
  const dialogId = DIALOGS.USER_BRANCH_EDIT;
  const dialogData = useSelector((state) => state?.dialogs?.[dialogId]);
  const data = useMemo(() => dialogData?.data, [dialogData]);

  const userBranchCache = useSelector(
    (state) => state.cache.userBranchRelationListCache,
  );

  const [userPermissionArray, setUserPermissionArray] = useState(
    data?.permissions,
  );
  const [loading, setLoading] = useState(data?.permissions);

  useEffect(() => {
    if (data) {
      setUserPermissionArray(data?.permissions);
    }
  }, [data]);

  const handleClose = () => {
    dispatch(closeDialog(dialogId));
  };

  const handleClickCheckbox = (permission) => {
    let newPermissionArray = [...userPermissionArray];
    if (userPermissionArray?.includes(permission)) {
      newPermissionArray = userPermissionArray.filter(
        (perm) => perm !== permission,
      );
    } else {
      newPermissionArray.push(permission);
    }
    setUserPermissionArray(newPermissionArray);
  };

  const clearNonexistingPermissions = (userPermissions) => {
    const currentPermissions = getCurrentPermissionArray();
    return userPermissions.filter((permission) =>
      currentPermissions.some((currentPerm) => currentPerm === permission),
    );
  };

  const handleClickSave = async () => {
    try {
      setLoading(true);
      const response = await instance.patch(
        AUTH_URLS.userBranchRelationEdit(data?.id),
        {
          new_permissions: clearNonexistingPermissions(userPermissionArray),
        },
      );
      const newCache = userBranchCache?.userBranchRelations?.map((relation) => {
        if (relation.id === response.data.id) {
          return {
            ...relation,
            ...response.data,
          };
        } else {
          return relation;
        }
      });
      dispatch(
        cacheUserBranchRelationList({
          userBranchRelations: newCache,
        }),
      );
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogData?.open} onClose={handleClose}>
      {dialogData?.open && (
        <Container>
          <BoldText>{data?.username}</BoldText>
          {userPermissionArray && (
            <PermissionsForm
              handleClickCheckbox={handleClickCheckbox}
              permissions={userPermissionArray}
            />
          )}
          <Button
            onClick={handleClickSave}
            loading={loading}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        </Container>
      )}
    </Dialog>
  );
};

export default UserBranchRelationEditModal;
