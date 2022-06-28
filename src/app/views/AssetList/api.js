import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { ASSET_APIS } from '../../../constants/restEndPoints';

export const deleteAssetApi = (id) => {
  return instance.delete(getURL(ASSET_APIS.DELETE, 'uuid', id));
};
