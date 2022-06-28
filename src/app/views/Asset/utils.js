import { ASSET_TYPES, ASSET_STATUS } from '../../../constants/choices';

export const formatDataForPosting = (data) => {
  return {
    ...data,
    type: data.type.value,
    status: data.status.value,
  };
};

export const formatEditData = (data) => {
  return {
    ...data,
    type: ASSET_TYPES.filter((a) => a.value === data.type)[0],
    status: ASSET_STATUS.filter((a) => a.value === data.status)[0],
  };
};
