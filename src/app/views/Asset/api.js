import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { ASSET_APIS } from '../../../constants/restEndPoints';

export const createEditAssetApi = (data, id) => {
  return id
    ? instance.put(getURL(ASSET_APIS.EDIT, 'uuid', id), data)
    : instance.post(ASSET_APIS.CREATE, data);
};
