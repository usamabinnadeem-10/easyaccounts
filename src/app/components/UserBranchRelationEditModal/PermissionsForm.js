import React, { useMemo, useState } from 'react';

import { Box } from '@mui/material';

import { generatePermissionForm } from '../../utilities/formUtils';

import {
  Form,
  FormGroup,
  FormRow,
  StyledCheckbox,
  BoldText,
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

export default PermissionsForm;
