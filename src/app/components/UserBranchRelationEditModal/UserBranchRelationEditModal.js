import React, { useMemo, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeDialog } from '../../../store/dialogs';

import { Dialog, Box } from '@mui/material';

import { DIALOGS } from '../../../constants/dialogIds';

import { generatePermissionForm } from '../../utilities/formUtils';

import instance from '../../../utils/axiosApi';
import { AUTH_URLS } from '../../../constants/restEndPoints';
import { cacheUserBranchRelationList } from '../../../store/cache';

import {
  Container,
  Form,
  FormGroup,
  FormRow,
  StyledCheckbox,
  BoldText,
  Button,
  RowText,
  Search,
} from './styled';

const CheckboxRow = ({ permission, checked, onClickCheckbox }) => {
  return (
    <FormRow>
      <RowText>{permission}</RowText>
      <StyledCheckbox
        onChange={() => onClickCheckbox(permission)}
        checked={checked}
      />
    </FormRow>
  );
};

const PermissionsForm = ({ permissions, handleClickCheckbox }) => {
  const userPermissionsHash = useMemo(
    () => permissions.reduce((a, v) => ({ ...a, [v]: true }), {}),
    [permissions],
  );
  const [searchTerm, setSearchTerm] = useState('');
  const permissionFormData = useMemo(() => {
    const formData = generatePermissionForm();
    if (searchTerm) {
      return formData.map((permissionGroup) => {
        return {
          ...permissionGroup,
          permissions: permissionGroup.permissions.filter((permission) =>
            permission.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        };
      });
    }
    return formData;
  }, [searchTerm]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Search
        onChange={(e) =>
          e.target.value ? setSearchTerm(e.target.value) : setSearchTerm('')
        }
        value={searchTerm}
        size="small"
      />
      <Form>
        {permissionFormData?.map((permissionGroup) => {
          if (permissionGroup?.permissions?.length > 0) {
            return (
              <FormGroup>
                <BoldText>{permissionGroup?.heading}</BoldText>
                {permissionGroup?.permissions?.map((perm) => (
                  <CheckboxRow
                    permission={perm}
                    checked={userPermissionsHash[perm]}
                    onClickCheckbox={handleClickCheckbox}
                  />
                ))}
              </FormGroup>
            );
          }
          return null;
        })}
      </Form>
    </Box>
  );
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [userPermissionArrayFiltered, setUserPermissionArrayFiltered] =
    useState(null);

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

  const handleClickSave = async () => {
    try {
      setLoading(true);
      const response = await instance.patch(
        AUTH_URLS.userBranchRelationEdit(data?.id),
        {
          new_permissions: userPermissionArray,
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
